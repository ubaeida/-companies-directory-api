const models = require("../models");
const { getInstanceById } = require("../services/modelService");
const { validateName } = require("../services/validationService");

const store = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };
  const { name = "", description = "", icon = "" } = req.body;
  const category = await models.Category.create({
    name,
    description,
    icon,
  });
  if (category) {
    result.data = category;
    result.messages.push("Category created successfully");
  } else {
    result.success = false;
    result.messages.push("Please try again later");
  }
  return res.send(result);
};
const index = async (req, res, next) => {
  const result = {
    success: true,
    data: null,
    messages: [],
  };
  const categories = await models.Category.findAll();
  result.data = categories;
  return res.send(result);
};
const update = async (req, res, next) => {
  const result = {
    success: false,
    data: null,
    messages: [],
  };
  const { name = "", description = "", icon = ""  } = req.body;
  const item = await getInstanceById(req.params.id, "Category");
  if (item.success) {
    if (!validateName(name)) {
      result.messages.push("Please enter a valid category name");
    } else {
      result.success = true;
      await item.instance.update({
        name,
        description,
        icon
      });
      result.data = item.instance;
      result.messages.push("Category updated successfully");
    }
  } else {
    result.messages = [...item.messages];
  }
  res.status(item.status);
  return res.send(result);
};
const show = async (req, res, next) => {
  const result = {
    success: false,
    data: null,
    messages: [],
  };
  const item = await getInstanceById(req.params.id, "Category");
  if (item.success) {
    result.success = true;
    result.data = item.instance.dataValues;
  }
  result.messages = [...item.messages];
  res.status(item.status);
  return res.send(result);
};

const destroy = async (req, res, next) => {
  const result = {
    success: false,
    data: null,
    messages: [],
  };
  const item = await getInstanceById(req.params.id, "Category");
  if (item.success) {
    result.success = true;
    await item.instance.destroy();
    result.messages.push("Category deleted successfully");
  } else {
    result.messages = [...item.messages];
  }
  res.status(item.status);
  return res.send(result);
};
module.exports = {
  store,
  index,
  show,
  update,
  destroy,
};
