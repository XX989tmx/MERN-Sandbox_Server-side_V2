const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  persons: [{ type: String, required: true }],
  src: { type: String, required: true },
  tags: [{ type: String, required: true }],
  categories: [{ type: String, required: true }],
  // genre: [{ type: String, required: true }],
  date_created: { type: String, required: true },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  duration: { type: String, required: true },
  hd: { type: Boolean, required: true },
  is4k: { type: Boolean, required: true },
  image: { type: String, required: true },
  views: { type: Number, required: true },
  liked: { type: Number, required: true },
  disliked: { type: Number, required: true },
  // admin: { type: mongoose.Types.ObjectId, required: true, ref: "Admin" },
  // likes: [{ type: mongoose.Types.ObjectId, required: true, ref: "Like" }],
  // dislikes: [{ type: mongoose.Types.ObjectId, required: true, ref: "Dislike" }],
});

module.exports = mongoose.model("Video", videoSchema);