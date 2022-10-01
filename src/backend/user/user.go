package user

import (
	"log"
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
			user, _ := e.App.Dao().FindUserById(id)
			avatar_url := c.QueryParam("avatar_url")

			_, err := e.App.Dao().DB().NewQuery(`UPDATE profiles
				SET avatar = {:avatar_url}
				WHERE id={:id}
			`).Bind(dbx.Params{
				"id":         user.Profile.Id,
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

func DefaultProfileValues(e *core.UserCreateEvent) error {
	now := time.Now()
	log.Print("Halloooo?????")

	// _, err := global.ProgNovelApp.App.DB().NewQuery(`UPDATE profile
	// 	SET lastTimeCoinAcquired = {:now}
	// `).Bind(dbx.Params{
	// 	"id":  e.User.Id,
	// 	"now": now,
	// }).Execute()

	// if err != nil {
	// 	return nil
	// }

	e.User.Profile.SetDataValue("lastTimeCoinAcquired", now)

	return nil
}

type AuthMeta struct {
	name string
}

func AuthDefaultProfileValues(e *core.UserAuthEvent) error {

	log.Print(e.Meta)
	log.Print(e.User.Profile.GetDataValue("name"))

	return nil
}
