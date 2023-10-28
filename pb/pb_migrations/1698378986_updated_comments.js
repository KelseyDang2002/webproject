/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e64i3vselel7rwy")

  // remove
  collection.schema.removeField("l0jbaxak")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wxthahuz",
    "name": "post_key",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e64i3vselel7rwy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l0jbaxak",
    "name": "post_key",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // remove
  collection.schema.removeField("wxthahuz")

  return dao.saveCollection(collection)
})
