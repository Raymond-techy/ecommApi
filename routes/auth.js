const express = require("express");
const { loginUser, registerUser } = require("../controllers/auth");
const { uploadImage } = require("../Service/imageUpload");

const multer = require("multer");
const upload = multer();

const router = express.Router();

router.post("/login", loginUser);
router.post("/upload", upload.array("product-images", 12), uploadImage);
router.post("/register", registerUser);

module.exports = router;
