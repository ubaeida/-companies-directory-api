var express = require("express");
const {store, index, update, destroy, show} = require("../controllers/categoryController");
var router = express.Router();

router.post("/", store);
router.get("/", index);
router.put("/:id", update);
router.delete("/:id", destroy);
router.get('/:id', show);

module.exports = router;
