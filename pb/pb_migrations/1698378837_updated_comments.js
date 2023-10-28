/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e64i3vselel7rwy")

  // remove
  collection.schema.removeField("tclil8d2")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("e64i3vselel7rwy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tclil8d2",
    "name": "comment_key",
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
  collection.schema.removeField("l0jbaxak")

  return dao.saveCollection(collection)
})
