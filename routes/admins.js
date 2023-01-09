var express = require("express");
var router = express.Router();
const {store, login, index, update, destroy, show } = require("../controllers/adminController");
const {nameValidation, emailValidation, passwordValidation, phoneValdation} = require("../services/validationService");
const { isAuth } = require("../middlewares/isAuth");

router.post(
  "/register",
  nameValidation,
  emailValidation,
  passwordValidation,
  phoneValdation,
  store
);

router.post("/login", emailValidation, passwordValidation, login);

router.get("/", (res, req, next) => isAuth(res, req, next, ["admin"]), index);

router.put(
  "/:id",
  nameValidation,
  emailValidation,
  passwordValidation,
  phoneValdation,
  (res, req, next) => isAuth(res, req, next, ["admin"]),
  update
);

router.delete("/:id",(res, req, next) => isAuth(res, req, next, ["admin"]) ,destroy);

router.get('/:id',(res, req, next) => isAuth(res, req, next, ["admin"]), show);

module.exports = router;
