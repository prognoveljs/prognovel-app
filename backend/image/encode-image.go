package image

import (
	"bytes"
	"image/jpeg"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/kolesa-team/go-webp/encoder"
	"github.com/kolesa-team/go-webp/webp"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/core"
)

func EncodeImageAndSave(e *core.ServeEvent) {
	e.Router.AddRoute(echo.Route{
		Method: http.MethodGet,
		Path:   "/api/upload-image/:collection/:record",
		Handler: func(c echo.Context) error {
			inputData, err := ioutil.ReadAll(c.Request().Body)
			if err != nil {
				return err
			}
			inputBuffer := bytes.NewBuffer(inputData)

			// Decode the input image
			img, err := jpeg.Decode(inputBuffer)
			if err != nil {
				return err
			}

			// Create an output buffer
			outputBuffer := new(bytes.Buffer)

			options, err := encoder.NewLossyEncoderOptions(encoder.PresetDefault, 75)
			if err != nil {
				log.Fatalln(err)
			}

			if err := webp.Encode(outputBuffer, img, options); err != nil {
				log.Fatalln(err)
			}

			// Get the output data as a byte slice
			outputData := outputBuffer.Bytes()

			// Return the output data as the response
			return c.Blob(http.StatusOK, "image/webp", outputData)
		},
		Middlewares: []echo.MiddlewareFunc{
			// apis.RequireAdminOrOwnerAuth("user-id"),
		},
	})
}
