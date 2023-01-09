var express = require("express");
var router = express.Router();
const {
  store,
  index,
  update,
  destroy,
  show,
} = require("../controllers/categoryController");
const { upload } = require("../storage/storage");
const { checkSchema, body } = require("express-validator");
const { isAuth } = require("../middlewares/isAuth");

router.post( "/", (req, res, next) => isAuth(req, res, next, ["admin"]), upload.single("icon"),
  checkSchema({
    icon: {
      custom: {
        options: (value, { req, path }) => !!req.file,
        errorMessage: "You should upload a valid image file up to 1Mb",
      },
    },
  }),
  body("name").isLength({ min: 2, max: 20 }),
  body("description").isLength({ min: 2, max: 20 }),
  store
);
router.get("/",(req, res, next) => isAuth(req, res, next, ["all"]) ,index);
router.put("/:id", (req, res, next) => isAuth(req, res, next, ["admin"])  ,update);
router.delete("/:id", (req, res, next) => isAuth(req, res, next, ["admin"])  ,destroy);
router.get("/:id",(req, res, next) => isAuth(req, res, next, ["all"]),show);

module.exports = router;