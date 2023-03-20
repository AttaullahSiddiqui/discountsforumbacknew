let mongoose = require("mongoose");

let blogCommentsSchema = mongoose.Schema({
  msg: { type: String, required: true },
  blogId: { type: String, required: true, ref: "Blog" },
  active: { type: Boolean, default: false },
  CreatedAt: { type: String, default: Date.now() },
});

module.exports = mongoose.model("blogComments", blogCommentsSchema);
