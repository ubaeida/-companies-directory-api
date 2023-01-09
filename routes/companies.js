var express = require("express");
var router = express.Router();
const { store } = require("../controllers/companyController1");
const {
  nameValidation,
  emailValidation,
  passwordValidation,
  logoValdation,
  bannerValdation,
  addressValdation
} = require("../services/validationService");
const { isAuth } = require("../middlewares/isAuth");
const { upload } = require("../storage/storage");

router.post(
  "/register",
  upload.single("logo"),
  logoValdation,
  upload.single("banner"),
  bannerValdation,
  nameValidation,
  emailValidation,
  passwordValidation,
  addressValdation,
  store
);

module.exports = router;
