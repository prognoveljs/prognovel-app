package user

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func AvatarUpload(e *core.ServeEvent) error {
	e.Router.AddRoute(echo.Route{
		Method: http.MethodGet,
		Path:   "/api/avatar-upload/:user-id",
		Handler: func(c echo.Context) error {
			id := c.PathParam("user-id")
			user, _ := e.App.Dao().FindRecordById("user", id)
			avatar_url := c.QueryParam("avatar_url")

			_, err := e.App.Dao().DB().NewQuery(`UPDATE profiles
				SET avatar = {:avatar_url}
				WHERE id={:id}
			`).Bind(dbx.Params{
				"id":         user.Id,
				"avatar_url": avatar_url,
			}).Execute()

			if err != nil {
				return c.String(http.StatusBadRequest, err.Error())
			}

			return c.JSON(200, user)
		},
		Middlewares: []echo.MiddlewareFunc{
			apis.RequireAdminOrOwnerAuth("user-id"),
		},
	})

	return nil
}

func DefaultProfileValues(e *core.RecordCreateEvent) error {
	if e.Record.Collection().Name == "users" {

		now := time.Now()

		e.Record.Set("lastTimeCoinAcquired", now)
	}

	return nil
}

type AuthMeta struct {
	name string
}
