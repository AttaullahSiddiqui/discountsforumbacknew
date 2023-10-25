const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "publishers",
  api_key: "372226457885521",
  api_secret: "MaCBM0kfaLNkuVZ72ynR1MKsNb0",
  secure: true,
});

module.exports = cloudinary;
