package main

import (
	"log"
	"prognovel/src/backend/coin"
	"prognovel/src/backend/user"

	"github.com/ReneKroon/ttlcache"
	"github.com/pocketbase/pocketbase"
)

func main() {
	app := pocketbase.New()

	app.OnBeforeServe().Add(coin.Calculate)
	app.OnBeforeServe().Add(user.AvatarUpload)

	ttlcache.NewCache()

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
