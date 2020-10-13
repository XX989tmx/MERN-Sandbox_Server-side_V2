const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleCommentSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  article: { type: mongoose.Types.ObjectId, ref: "Article" },
//   title: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: String },
});

module.exports = mongoose.model("ArticleComment", articleCommentSchema);
