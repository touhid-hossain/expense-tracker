const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// file upload core function
// we do not use this because this only upload the image cloudinary
const cloudinaryUpload = (file) => cloudinary.uploader.upload(file);
module.exports = cloudinaryUpload;
