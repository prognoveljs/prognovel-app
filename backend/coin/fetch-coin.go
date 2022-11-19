package coin

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models"
)

func Fetch(e *core.ServeEvent) error {
	// add new "GET /api/hello" route to the app router (echo)
	e.Router.AddRoute(echo.Route{
		Method: http.MethodGet,
		Path:   "/api/fetch-coin/:user-id",
		Handler: func(c echo.Context) error {
			id := c.PathParam("user-id")
			collection, err := e.App.Dao().FindCollectionByNameOrId("coins")

			if err != nil {
				return c.String(http.StatusBadRequest, err.Error())
			}

			coin, err := e.App.Dao().FindRecordsByExpr("coins", dbx.HashExp{
				"user": id,
			})

			if err != nil {
				return c.String(http.StatusBadRequest, err.Error())
			}

			if len(coin) == 0 {
				record := models.NewRecord(collection)
				record.Set("amount", 0)
				record.Set("delay", 0)
				record.Set("user", id)
				record.Set("last_time_acquired", time.Now())

				if err := e.App.Dao().SaveRecord(record); err != nil {
					return c.String(http.StatusBadRequest, err.Error())
				}

				return c.JSON(200, record)
			}

			return c.JSON(200, coin[0])
		},
		Middlewares: []echo.MiddlewareFunc{
			apis.RequireAdminOrOwnerAuth("user-id"),
		},
	})

	return nil
}
