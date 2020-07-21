const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dislikeSchema = new Schema({
  dislike_count: { type: Number, required: true },
  video: { type: mongoose.Types.ObjectId, required: true, ref: "Video" },
});

module.exports = mongoose.model("Dislike", dislikeSchema);
