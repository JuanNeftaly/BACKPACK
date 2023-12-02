require("dotenv").config();
const cloudinary = require('cloudinary').v2;
const tools = {};
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

tools.uploadFile = async (resourse) => {
  const result = await cloudinary.uploader.upload(resourse);

  return result;  
}

module.exports = tools;