package main

import (
	"log"
	global "prognovel/backend/app"
	"prognovel/backend/coin"
	"prognovel/backend/user"

	"github.com/ReneKroon/ttlcache"
)

func main() {

	global.ProgNovelApp.OnBeforeServe().Add(coin.Calculate)
	global.ProgNovelApp.OnBeforeServe().Add(user.AvatarUpload)
	// global.ProgNovelApp.OnBeforeServe().Add(image.OptimizeImageAndSave)
	global.ProgNovelApp.OnUserBeforeCreateRequest().Add(user.DefaultProfileValues)
	global.ProgNovelApp.OnUserAuthRequest().Add(user.AuthDefaultProfileValues)
	// global.ProgNovelApp.OnCollectionAfterCreateRequest().Add(schema.SaveDatabaseSchemaOnCreate)
	// global.ProgNovelApp.OnCollectionAfterDeleteRequest().Add(schema.SaveDatabaseSchemaOnDelete)
	// global.ProgNovelApp.OnCollectionAfterUpdateRequest().Add(schema.SaveDatabaseSchemaOnUpdate)

	if err := global.ProgNovelApp.Start(); err != nil {
		log.Fatal(err)
	}

	ttlcache.NewCache()
}
