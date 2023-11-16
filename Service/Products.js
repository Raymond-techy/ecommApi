const { Product } = require("../models/products");

const getProductService = async (productId) => {
  const product = await Product.findById(productId);
  return product;
};

const getAllProductsService = async () => {
  const products = await Product.find();
  return products || [];
};

const deleteProductService = async (productId) => {
  const products = await Product.findByIdAndRemove(productId);
  return products;
};
const createProductService = async (body) => {
  const { name, price, quantity, description } = body;
  const product = new Product({
    name,
    price,
    quantity,
    description,
  });
  await product.save();

  return product;
};

const updateProductService = async (productID, body) => {
  const { name, price, quantity, description } = body;
  const product = await Product.findById(productID);

  product.name = name;
  product.price = price;
  product.quantity = quantity;
  product.description = description;

  return await product.save();
};

module.exports = {
  getProductService,
  getAllProductsService,
  deleteProductService,
  createProductService,
  updateProductService,
};
