const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

async function uploadImage(req, res) {
  console.log("uploading...");
  try {
    const multiples = await handleMultiple(req.files);
    res.send(multiples);
  } catch (e) {
    res.json(e.message);
  }
}

const handleSingle = async (file) => {
  try {
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    const { url } = await cloudinary.uploader.upload(dataURI, {
      resource_type: "auto",
    });
    return url;
  } catch (error) {
    res.json(error.message);
  }
};

const handleMultiple = async (files) => {
  const multipleImages = [];
  for (let i = 0; i < files.length; i++) {
    const result = await handleSingle(files[i]);
    multipleImages.push(result);
  }
  return multipleImages;
};

module.exports = { uploadImage, handleMultiple };
