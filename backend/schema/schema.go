package schema

import (
	"encoding/json"
	"log"
	"os"

	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/models/schema"
)

func SaveDatabaseSchemaOnCreate(e *core.CollectionCreateEvent) error {
	schema := e.Collection.Schema.AsMap()
	saveSchema(schema)

	return nil
}

func SaveDatabaseSchemaOnDelete(e *core.CollectionDeleteEvent) error {
	schema := e.Collection.Schema.AsMap()

	saveSchema(schema)
	return nil
}

func SaveDatabaseSchemaOnUpdate(e *core.CollectionUpdateEvent) error {
	schema := e.Collection.Schema.AsMap()

	saveSchema(schema)
	return nil
}

func saveSchema(schema map[string]*schema.SchemaField) {
	json, err := json.Marshal(schema)
	// dbx.In()

	if err != nil {
		log.Println("[ERROR] Unable to save schema.")
		return
	}
	// core.

	log.Println("Saving schema...")

	os.WriteFile("backend/database_schema.json", json, 0644)
}
