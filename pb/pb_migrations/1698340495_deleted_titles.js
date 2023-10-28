/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("pa3qge3mo7uhgsh");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "pa3qge3mo7uhgsh",
    "created": "2023-10-26 16:54:32.797Z",
    "updated": "2023-10-26 16:54:32.797Z",
    "name": "titles",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ay6gcthe",
        "name": "title_key",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "m5ciq387",
        "name": "title_text",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
