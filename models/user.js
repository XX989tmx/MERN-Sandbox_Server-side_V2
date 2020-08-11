const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
  // user_detail_infos: [{
  //   type: mongoose.Types.ObjectId,
  //   required: true,
  //   ref: "UserDetailInfo",
  // }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);