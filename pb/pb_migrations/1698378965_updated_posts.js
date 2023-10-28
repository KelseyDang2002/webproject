/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("734n6cf2lb1r228")

  // remove
  collection.schema.removeField("zajngq9k")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nzbmydnv",
    "name": "category_key",
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
  const collection = dao.findCollectionByNameOrId("734n6cf2lb1r228")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zajngq9k",
    "name": "category_key",
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
  collection.schema.removeField("nzbmydnv")

  return dao.saveCollection(collection)
})
