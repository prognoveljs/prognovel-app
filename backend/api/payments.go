package api

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	global "prognovel/backend/app"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
)

type PaypalNotif struct {
	ID               string              "json:id"
	Create_Time      string              "json:create_time"
	Resource_Type    string              "json:resource_type"
	Event_Type       string              "json:event_type"
	Summary          string              "json:summary"
	Resource         PaypalNotifResource "json:resource"
	Links            []interface{}       "json:links"
	Event_Version    string              "json:event_version"
	ZTS              int                 "json:zts"
	Resource_Version string              "json:resource_version"
}

type PaypalNotifResource struct {
	ID             string          "json:id"
	Update_Time    string          "json:update_time"
	Create_Time    string          "json:create_time"
	Purchase_Units []PurchaseUnits "json:purchase_units"
	Links          []interface{}   "json:links"
	Gross_Amount   CurrencyAmount  "json:gross_amount"
	Intent         string          "json:intent"
	Payer          interface{}     "json:payer"
	Status         string          "json:status"
}

type PurchaseUnits struct {
	Amount  CurrencyAmount "json:amount"
	User_ID string         "json:user_id"
}

type CurrencyAmount struct {
	Currency_Code string "json:currency_code"
	Value         string "json:value"
}

func PaymentRoute(e *core.ServeEvent) error {
	e.Router.AddRoute(echo.Route{
		Method: http.MethodPost,
		Path:   "/api/paypal-payment",
		Handler: func(c echo.Context) error {
			var body PaypalNotif
			err := json.NewDecoder(c.Request().Body).Decode(&body)
			log.Print("Incoming paypal webhook " + c.Request().Host)

			if err != nil {
				log.Print(err)
				return err
			}

			event_type := body.Event_Type
			switch event_type {
			case "PAYMENT.AUTHORIZATION.CREATED":
				// checkout(body)
			case "CHECKOUT.ORDER.COMPLETED":
				return checkout(c, body)
			}

			return c.String(200, "Webhook received")
		},
	})

	return nil
}

func checkout(c echo.Context, notif PaypalNotif) error {
	detail := notif.Resource.Purchase_Units[0]
	amount, err := strconv.Atoi(detail.Amount.Value)

	if err != nil {
		return c.String(http.StatusInternalServerError, "Error processing poayment amount type.")
	}

	user_id := detail.User_ID

	if user_id == "" || amount == 0 {
		return c.String(http.StatusUnprocessableEntity, "Required field not found.")
	}

	coin_amount := calculateCoinAmount(amount, detail.Amount.Currency_Code)

	record, err := global.ProgNovelApp.App.Dao().FindRecordsByExpr("coin", dbx.HashExp{
		"user": user_id,
	})

	if err != nil {
		return c.String(http.StatusInternalServerError, "Error processing coin on database table.")
	}

	coin_current := record[0].GetInt("coin")
	record[0].Set("coin", coin_current+coin_amount)

	err = global.ProgNovelApp.App.Dao().SaveRecord(record[0])

	if err != nil {
		return c.String(http.StatusInternalServerError, "Error saving coin record on database.")
	}

	return c.String(200, "Webhook received")
}

func calculateCoinAmount(amount int, currency string) int {
	switch currency {
	case "USD":
		return amount * 5
	}

	return 0
}
