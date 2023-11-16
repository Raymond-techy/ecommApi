const express = require("express");
const {
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
} = require("../controllers/products");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
