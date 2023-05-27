package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/imdario/mergo"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/core"
)

type SiteMetadata struct {
	SiteTitle                         string `json:"site_title"`
	Contact                           string `json:"contact"`
	GlobalPaymentPointer              string `json:"global_payment_pointers"`
	LimitGlobalPaymentPointersInNovel string `json:"limit_global_payment_pointers_share_in_novel"`
	Highlight                         struct {
		News   []NewsHighlightItem  `json:"news"`
		Novels []NovelHighlightItem `json:"novels"`
	} `json:"highlight"`
}

type NewsHighlightItem struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Author    User   `json:"author"`
	CreatedAt int    `json:"created_at"`
}

type NovelHighlightItem struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Synopsis    string   `json:"synopsis"`
	Tags        []string `json:"tags"`
	Genre       []string `json:"genre"`
	Demographic string   `json:"demographic"`
	Cover       string   `json:"cover"`
	Author      User     `json:"author"`
}

type User struct {
	ID       string `json:"id"`
	Nickname string `json:"nickname"`
	Avatar   string `json:"avatar"`
}

var data_file_name string = ".cache/site_metadata.json"

var site_metadata_global SiteMetadata

func init() {
	if _, err := os.Stat(".cache"); os.IsNotExist(err) {
		os.MkdirAll(".cache", 0700) // Create your file
	}

	file, err := os.Open(data_file_name)
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()

	// Read the file content
	content, err := ioutil.ReadAll(file)
	if err != nil {
		fmt.Println("Error reading file:", err)
		return
	}

	err = json.Unmarshal(content, &site_metadata_global)
	if err != nil {
		fmt.Println("Error unmarshaling JSON:", err)
	}
}

func APISiteMetadataRoute(e *core.ServeEvent) error {
	// add new "GET /api/hello" route to the app router (echo)
	e.Router.AddRoute(echo.Route{
		Method: http.MethodGet,
		Path:   "/api/site-metadata",
		Handler: func(c echo.Context) error {

			return c.JSON(http.StatusOK, site_metadata_global)
		},
		Middlewares: []echo.MiddlewareFunc{
			// apis.RequireAdminOrOwnerAuth("user-id"),
		},
	})

	e.Router.AddRoute(echo.Route{
		Method: http.MethodPost,
		Path:   "/api/site-metadata",
		Handler: func(c echo.Context) error {
			data := new(SiteMetadata)

			if err := c.Bind(data); err != nil {
				return c.String(http.StatusBadRequest, "Bad request")
			}

			if err := mergo.Merge(&site_metadata_global, data, mergo.WithOverride); err != nil {
				return c.String(http.StatusBadRequest, "Failed to update site metadata")
			}

			json, err := json.Marshal(site_metadata_global)

			if err != nil {
				fmt.Println("Error marshalling JSON:", err)
			}

			fmt.Println("Writing site metadata to file..")
			if err := os.WriteFile(data_file_name, json, 0600); err != nil {
				fmt.Println("Error writing to file:", err)
			}

			return c.JSON(http.StatusOK, site_metadata_global)
		},
		Middlewares: []echo.MiddlewareFunc{
			// apis.RequireAdminAuth(),
		},
	})

	return nil
}
