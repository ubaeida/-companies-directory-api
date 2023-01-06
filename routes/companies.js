var express = require("express");
var router = express.Router();
var {
  store,
  login,
  index,
  update,
  destroy,
  show,
} = require("../controllers/companyController");

/* GET users listing. */
router.post("/register", store);
router.post("/login", login);
router.get("/", index);
router.put("/:id", update);
router.delete("/:id", destroy);
router.get("/:id", show);


module.exports = router;
