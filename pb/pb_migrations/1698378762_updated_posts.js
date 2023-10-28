/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("734n6cf2lb1r228")

  // remove
  collection.schema.removeField("9jxotbqr")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("734n6cf2lb1r228")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9jxotbqr",
    "name": "post_title",
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

  // remove
  collection.schema.removeField("zajngq9k")

  return dao.saveCollection(collection)
})
