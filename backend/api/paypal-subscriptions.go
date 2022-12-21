package api

import (
	"log"
	"os"

	"github.com/plutov/paypal/v4"
)

func main() {
	// Create a client instance
	p, err := paypal.NewClient("clientID", "secretID", paypal.APIBaseSandBox)
	p.SetLog(os.Stdout) // Set log to terminal stdout
	if err != nil {
		log.Print(err)
	}

	// accessToken, err := p.GetAccessToken(context.Background())
}
