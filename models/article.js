const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  author: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  wishlists: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Wishlist" },
  ],
  categories: [{ type: String, required: true }],
  date_created: { type: String, required: true },
  tags: [{ type: String, required: true }],
  price: { type: Number, required: true },
  // review: { type: Number, required: true },
});

module.exports = mongoose.model('Article', articleSchema);