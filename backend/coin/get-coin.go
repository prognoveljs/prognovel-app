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
			var level int = 1

			record, err := e.App.Dao().FindRecordsByExpr("coins", dbx.HashExp{
				"user": id,
			})

			if len(record) == 0 {
				return c.String(http.StatusBadRequest, "No user coin found in database.")
			}

			coin := record[0]
			amount := coin.GetInt("amount")
			now := time.Now()

			amount += get_coin_reward(level)
			delay := get_coin_delay(level)

			coin.Set("amount", amount)
			coin.Set("delay", delay)
			coin.Set("last_time_acquired", now)

			e.App.Dao().SaveRecord(coin)

			if err != nil {
				return c.String(http.StatusBadRequest, err.Error())
			}

			// user.Profile.SetDataValue("coin", coin)
			// user.Profile.SetDataValue("lastTimeCoinAcquired", now)
			// user.Profile.SetDataValue("coinGetDelay", delay)

			return c.JSON(200, coin)
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
