const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  person: { type: String, required: true },
  url: { type: String, required: true },
  admin: { type: mongoose.Types.ObjectId, required: true, ref: "Admin" },
  likes: [{ type: mongoose.Types.ObjectId, required: true, ref: "Like" }],
  dislikes: [{ type: mongoose.Types.ObjectId, required: true, ref: "Dislike" }],
});

module.exports = mongoose.model("Video", videoSchema);