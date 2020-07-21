const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const likeSchema = new Schema({
  like_count: { type: Number, required: true },
  video: { type: mongoose.Types.ObjectId, required: true, ref: "Video" },
});

module.exports = mongoose.model("like", likeSchema);
