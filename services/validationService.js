const {
  validationResult,
  body,
  checkSchema,
} = require("express-validator");

const errorRepons = (req, res, next) => {
  const httpResponse = {
    success: false,
    data: null,
    messages: [],
  };
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors
      .array()
      .forEach((error) =>
        httpResponse.messages.push(`${error.msg} - ${error.param}`)
      );
    res.status(422);
    return res.send(httpResponse);
  }
  return next();
};
const nameValidation = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required for the name")
    .escape()
    .notEmpty()
    .withMessage("Name can not be empty!")
    .bail(),
  errorRepons,
];

const emailValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email address!")
    .notEmpty()
    .withMessage("Email can not be empty!")
    .bail(),
  errorRepons,
];

const passwordValidation = [
  body("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    )
    .notEmpty()
    .withMessage("Password can not be empty!"),
  errorRepons,
];

const phoneValdation = [
  body("phone")
    .isLength({ min: 6 })
    .optional({ nullable: true })
    .withMessage("Minimum 6 characters required for the phone!"),
  errorRepons,
];

const bioValdation = [
  body("bio")
    .isLength({ min: 250 })
    .optional({ nullable: true })
    .withMessage("Maxmium 250 characters required for the bio!"),
  errorRepons,
];

const addressValdation = [
  body("address")
    .isLength({ max: 250 })
    .optional({ nullable: true })
    .withMessage("Maxmium 250 characters required for the address!"),
  errorRepons,
];

const avatarValdation = [
  checkSchema({
    avatar: {
      custom: {
        options: (value, { req, path }) => !!req.file,
        errorMessage: "You should upload a valid image file up to 1Mb",
        errorRepons,
      },
    },
  }),
];

const logoValdation = [
  checkSchema({
    logo: {
      custom: {
        options: (value, { req, path }) => !!req.file,
        errorMessage: "You should upload a valid image file up to 1Mb",
        errorRepons,
      },
    },
  }),
];

const bannerValdation = [
  checkSchema({
    banner: {
      custom: {
        options: (value, { req, path }) => !!req.file,
        errorMessage: "You should upload a valid image file up to 1Mb",
        errorRepons,
      },
    },
  }),
];
module.exports = {
  nameValidation,
  emailValidation,
  passwordValidation,
  phoneValdation,
  avatarValdation,
  bioValdation,
  logoValdation,
  bannerValdation,
  addressValdation,
};
