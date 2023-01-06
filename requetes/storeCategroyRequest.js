const { validateName } = require("../services/validationService");

const storeCategoryRequest = (req, res, next) => {
  const { name = "", description = "", icon = "" } = req.body;
  // Validation
  if (!validateName(name)) {
    return res.send({
      success: false,
      messages: ["Please enter a valid category name"],
    });
  }
  return next();
};

module.exports = {
  storeCategoryRequest,
};
