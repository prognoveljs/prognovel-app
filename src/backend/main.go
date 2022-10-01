package main

import (
	"log"
	global "prognovel/src/backend/app"
	"prognovel/src/backend/coin"
	"prognovel/src/backend/image"
	"prognovel/src/backend/user"

	"github.com/ReneKroon/ttlcache"
)

func main() {

	global.ProgNovelApp.OnBeforeServe().Add(coin.Calculate)
	global.ProgNovelApp.OnBeforeServe().Add(user.AvatarUpload)
	global.ProgNovelApp.OnBeforeServe().Add(image.OptimizeImageAndSave)
	global.ProgNovelApp.OnUserBeforeCreateRequest().Add(user.DefaultProfileValues)
	global.ProgNovelApp.OnUserAuthRequest().Add(user.AuthDefaultProfileValues)

	if err := global.ProgNovelApp.Start(); err != nil {
		log.Fatal(err)
	}

	ttlcache.NewCache()
}
