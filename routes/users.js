var express = require("express");
const {store, login, index,update, destroy, show, } = require("../controllers/userController");
const { nameValidation, emailValidation, passwordValidation,  avatarValdation, } = require("../services/validationService");
const { isAuth } = require("../middlewares/isAuth");
var router = express.Router();
const { upload } = require("../storage/storage");

router.post(
  "/register",
  upload.single("avatar"),
  avatarValdation,
  nameValidation,
  emailValidation,
  passwordValidation,
  store
);

router.post("/login", emailValidation, passwordValidation, login);

router.get("/", (res, req, next) => isAuth(res, req, next, ["admin"]), index);

router.put(
  "/:id",
  (res, req, next) => isAuth(res, req, next, ["user"]),
  upload.single("avatar"),
  avatarValdation,
  nameValidation,
  emailValidation,
  passwordValidation,
  update
);
router.delete(
  "/:id",
  (res, req, next) => isAuth(res, req, next, ["admin", "user"]),
  destroy
);

router.get(
  "/:id",
  (res, req, next) => isAuth(res, req, next, ["admin", "user"]),
  show
);

module.exports = router;
