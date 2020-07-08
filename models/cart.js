const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  articles: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Article",
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);