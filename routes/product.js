const express = require("express");

const multer = require("multer");
const upload = multer();

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
router.post("/", upload.array("product-images", 12), createProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
