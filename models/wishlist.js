const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  name: { type: String, required: true },
  articles: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Article",
    }
  ],
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
