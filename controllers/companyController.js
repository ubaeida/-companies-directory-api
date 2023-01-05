const models = require("../models");
const { verifyPassword, hashPassword } = require("../services/passwordService");
const {
  validateEmail,
  validateName,
  validatePassword,
} = require("../services/validationService");
const { companyTransformer } = require("../transformers/company");

const store = async (req, res) => {
  const result = {
    success: true,
    messages: [],
    data: [],
  };
  const {
    name = "",
    email = "",
    password = "",
    categoryId = 2,
    provinceId = 2,
    cityId = 2,
  } = req.body;

  if (!validateName(name)) {
    result.success = false;
    result.messages.push("Please enter a vaild name");
  }
  if (!validateEmail(email)) {
    result.success = false;
    result.messages.push("Please enter a vaild email");
  }
  if (!validatePassword(password)) {
    result.success = false;
    result.messages.push("Please enter a vaild password");
  }
  if (!result.success) {
    // Validation field
    return res.send(result);
  }

  const [account, created] = await models.Company.findOrCreate({
    where: { email },
    defaults: {
      name,
      password: hashPassword(password),
      categoryId,
      provinceId,
      cityId,
    },
  });
  if (created) {
    result.messages.push("Account Created Successfully");
  } else {
    result.success = false;
    result.messages.push("You are alredy registered");
  }

  return res.send(result);
};

const login = async (req, res) => {
  const result = {
    success: true,
    messages: [],
    data: [],
  };
  const { email, password } = req.body;
  if (!validateEmail(email)) {
    result.success = false;
    result.messages.push("Please enter a vaild email");
  }
  if (!validatePassword(password)) {
    result.success = false;
    result.messages.push("Please enter a vaild password");
  }
  if (!result.success) {
    return res.send(result);
  }

  const companyUser = await models.Company.findOne({
    where: { email },
  });
  if (companyUser) {
    if (verifyPassword(password, companyUser.password)) {
      result.data = companyTransformer(companyUser);
      result.messages.push("Logged in successfully");
      // send token later
    } else {
      (result.success = false), result.messages.push("invalid password ! ");
    }
  } else {
    (result.success = false),
      result.messages.push(
        "you dont have an account but you are welcome register"
      );
  }
  return res.send(result);
};

module.exports = {
  store,
  login,
};