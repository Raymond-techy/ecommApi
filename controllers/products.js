const { validateProduct } = require("../models/products");

const {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductService,
  updateProductService,
} = require("../Service/Products");

async function getAllProducts(req, res) {
  const products = await getAllProductsService();
  res.send(products);
}

async function getProduct(req, res) {
  const productId = req.params.id;
  const product = await getProductService(productId);
  if (!product)
    return res.status(400).send("There is no product with the given ID");
  res.send(product);
}

async function deleteProduct(req, res) {
  const productID = req.params.id;
  const product = await deleteProductService(productID);
  if (!product)
    return res.status(400).send("There is no product with the given ID");
  res.status(200).send({ message: "successfully deleted " });
}

async function updateProduct(req, res) {
  const productID = req.params.id;
  const body = req.body;
  const result = await updateProductService(productID, body);
  res.status(200).send(result);
}

async function createProduct(req, res) {
  const body = req.body;
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const product = await createProductService(body);
  res.status(200).send(product);
}

module.exports = {
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
};
