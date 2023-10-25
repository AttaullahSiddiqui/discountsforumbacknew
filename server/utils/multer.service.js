var multer = require("multer");
var fs = require("fs");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync("./files/images/", { recursive: true });
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, "./files/images/");
    } else {
      cb({ message: "this file is neither a video or image file" }, false);
    }
  },
  filename: (req, file, cb) => {
    let filename = file.originalname.split(".");
    cb(null, filename[0] + "_" + new Date().getTime() + "." + filename[1]);
  },
});
var upload = multer({ storage: storage });
module.exports = upload;
