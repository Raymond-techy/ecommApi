const mongoose = require("mongoose");
const joi = require("joi");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 50,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const Product = mongoose.model("product", productSchema);

const validateProduct = (prod) => {
  const schema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string().required(),
    quantity: joi.number().required(),
  });

  return schema.validate(prod);
};

module.exports = { Product, validateProduct };
