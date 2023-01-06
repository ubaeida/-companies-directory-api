var express = require("express");
const {store, index, update, destroy, show} = require("../controllers/categoryController");
const { storeCategoryRequest } = require("../requetes/storeCategroyRequest");
var router = express.Router();

router.post("/", storeCategoryRequest ,store);
router.get("/", index);
router.put("/:id", update);
router.delete("/:id", destroy);
router.get('/:id', show);

module.exports = router;
