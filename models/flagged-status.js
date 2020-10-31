const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const flaggedStatusSchema = new Schema({
  userWhoFlaggedThisComment: { type: mongoose.Types.ObjectId, ref: "User" },
  commentFlagged: { type: mongoose.Types.ObjectId, ref: "ArticleComment" },
  information: { type: String },
  date: { type: String },
});

module.exports = mongoose.model("FlaggedStatus", flaggedStatusSchema);
