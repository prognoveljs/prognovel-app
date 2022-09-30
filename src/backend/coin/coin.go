package coin

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func Calculate(e *core.ServeEvent) error {
	// add new "GET /api/hello" route to the app router (echo)
	e.Router.AddRoute(echo.Route{
		Method: http.MethodGet,
		Path:   "/api/get-coin/:user-id",
		Handler: func(c echo.Context) error {
			id := c.PathParam("user-id")
			user, _ := e.App.Dao().FindUserById(id)
			coin := user.Profile.GetIntDataValue("coin")
			level := user.Profile.GetIntDataValue("level")
			now := time.Now()
			if level < 1 {
				level = 1
			}

			coin += get_coin_reward(level)
			delay := get_coin_delay(level)

			_, err := e.App.Dao().DB().NewQuery(`UPDATE profiles 
				SET coin = {:coin}, lastTimeCoinAcquired = {:last_acquired}, coinGetDelay = {:coin_delay}
				WHERE id={:id}
			`).Bind(dbx.Params{
				"id":            user.Profile.Id,
				"coin":          coin,
				"last_acquired": now,
				"coin_delay":    delay,
			}).Execute()

			if err != nil {
				return c.String(http.StatusBadRequest, err.Error())
			}

			user.Profile.SetDataValue("coin", coin)
			user.Profile.SetDataValue("lastTimeCoinAcquired", now)
			user.Profile.SetDataValue("coinGetDelay", delay)

			return c.JSON(200, user)
		},
		Middlewares: []echo.MiddlewareFunc{
			apis.RequireAdminOrOwnerAuth("user-id"),
		},
	})

	return nil
}

func get_coin_reward(level int) int {
	return level * 20
}

func get_coin_delay(level int) int {
	delay := 24 - (level-1)*4

	if delay < 4 {
		delay = 4
	}

	return delay
}
