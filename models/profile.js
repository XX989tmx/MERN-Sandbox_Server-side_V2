const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  nickname: { type: String, required: true },
  introduce_yourself: { type: String, required: true },
  state: { type: String },
  city: { type: String },
  things_you_likes: [{ type: String }],
  things_you_hates: [{ type: String }],
  school: { type: String },
  company: { type: String },
});

module.exports = mongoose.model("Profile", profileSchema);
