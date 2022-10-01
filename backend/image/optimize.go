package image

import (
	"io"
	"net/http"
	"sync"

	global "prognovel/backend/app"

	vips "github.com/davidbyttow/govips/v2"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
)

var wg sync.WaitGroup

func OptimizeImageAndSave(e *core.ServeEvent) error {

	e.Router.AddRoute(echo.Route{
		Method: http.MethodGet,
		Path:   "/api/optimize-image/:collection/:record",
		Handler: func(c echo.Context) error {
			img, _ := c.FormFile("image")
			collection := c.PathParam("collection")
			record := c.PathParam("record")
			where := c.FormValue("where")
			src, _ := img.Open()
			defer src.Close()

			var imgTypes = []string{
				"webp",
				"png",
			}

			for _, imgType := range imgTypes {
				wg.Add(1)
				go (func() {
					defer wg.Done()

					img := convertAndSave(src, imgType)

					opts := saveImageOpts{
						collection: collection,
						record:     record,
						where:      where,
						imgType:    imgType,
					}

					saveImage(img, opts)
				})()
			}

			wg.Wait()

			return nil
		},
		Middlewares: []echo.MiddlewareFunc{
			// apis.RequireAdminOrOwnerAuth("user-id"),
		},
	})

	return nil
}

type imageOpts struct {
	width   int
	height  int
	quality int
}

func convertAndSave(src io.Reader, imgType string) []byte {
	vips.Startup(nil)
	defer wg.Done()
	defer vips.Shutdown()

	img, err := vips.NewImageFromReader(src)
	if err != nil {
		panic(err)
	}
	//  vips.Kernel
	err = img.Resize(.4, vips.KernelCubic)
	if err != nil {
		panic(err)
	}

	var convertImage []byte
	vipsType := vips.NewDefaultJPEGExportParams()
	// var err error

	switch imgType {
	case "webp":
		vipsType = vips.NewDefaultWEBPExportParams()
	case "png":
		vipsType = vips.NewDefaultPNGExportParams()
	}

	convertImage, _, err = img.Export(vipsType)

	if err != nil {
		panic(err)
	}

	return convertImage
}

type saveImageOpts struct {
	imgType    string
	collection string
	record     string
	where      string
}

func saveImage(image []byte, opts saveImageOpts) error {
	_, err := global.ProgNovelApp.App.DB().NewQuery(`UPDATE {:collection}
	SET {:record}_{:type} = {:image}
	WHERE {:where}
	`).Bind(dbx.Params{
		"type":       opts.imgType,
		"where":      opts.where,
		"collection": opts.collection,
		"record":     opts.record,
		"image":      image,
	}).Execute()

	return err
}
