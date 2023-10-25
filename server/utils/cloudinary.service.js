const cloudinary = require("../utils/cloudinary");

const cloudinaryStore = async (req, res, next) => {
  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path, {
      public_id: req.file.filename,
      folder: "discountsforum",
    });
    if (!response) {
      throw new Error("something went wrong");
    }
    req.imgURI = response.secure_url;
    req.imgPublicId = response.public_id;
  }
  next();
};
module.exports = cloudinaryStore;
