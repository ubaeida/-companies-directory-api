const models = require("../models");
const { getInstanceById } = require("../services/modelService");
const { hashPassword, verifyPassword } = require("../services/passwordService");
const { getToken, verifyToken } = require("../services/tokenService");
const { companyTransformer, companiesTransformer,} = require("../transformers/company");

const store = async (req, res, next) => {
  const httpResponse = {
    success: true,
    data: null,
    messages: [],
  };

  console.log('test')
  const province = await getInstanceById(req.body.provinceId, "Province");
  const city = await getInstanceById(req.body.cityId, "City");
  const category = await getInstanceById(req.body.categoryId, "Category");
  if (!province.success) {
    res.status(422)
    httpResponse.messages.push("Please enter a valid province id");
  }
  if (!city.success) {
    res.status(422)
    httpResponse.messages.push("Please enter a valid city id");
  }
  if (!category.success) {
    res.status(422)
    httpResponse.messages.push("Please enter a valid category id");
  }
  const [company, created] = await models.Company.findOrCreate({
    where: {
      email: req.body.email,
    },
    defaults: {
      name: req.body.name,
      password: hashPassword(req.body.password),
      logo: req?.file?.filename,
      banner: req?.file?.filename, 
      categoryId: req.body.categoryId,
      provinceId: req.body.provinceId,
      cityId: req.body.cityId,
      address: req.body.address
    },
  });
  if (created) {
    httpResponse.messages.push("User created successfully");
  } else {
    res.status(409);
    httpResponse.success = false;
    httpResponse.messages.push("You are already registered");
  }
  return res.send(httpResponse);
};

module.exports = {
  store,
};
