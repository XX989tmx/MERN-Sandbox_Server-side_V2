const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  articles: [{ type: mongoose.Types.ObjectId, required: true, ref: "Article" }],
  videos: [{ type: mongoose.Types.ObjectId, required: true, ref: "Video" }],
  readingLists: [
    { type: mongoose.Types.ObjectId, required: true, ref: "ReadingList" },
  ],
  staredArticles: [{ type: mongoose.Types.ObjectId, ref: "Article" }],
  following: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  followedBy: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  article_comments: [{ type: mongoose.Types.ObjectId, ref: "ArticleComment" }],
  profile: {
    type: mongoose.Types.ObjectId,
    ref: "Profile",
  },
  article_histories: [{ type: mongoose.Types.ObjectId, ref: "Article" }],
  addresses: [{ type: mongoose.Types.ObjectId, ref: "Address" }],
  // user_detail_infos: [{
  //   type: mongoose.Types.ObjectId,
  //   required: true,
  //   ref: "UserDetailInfo",
  // }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
