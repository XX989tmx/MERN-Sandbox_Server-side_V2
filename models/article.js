const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  // heading: { type: String, required: true },
  contents: [{ heading: { type: String }, content: { type: String } }],
  // heading2: { type: String, required: true },
  // content2: { type: String, required: true },
  // heading3: { type: String, required: true },
  // content3: { type: String, required: true },
  // heading4: { type: String, required: true },
  // content4: { type: String, required: true },
  images: [{ type: String }],
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  referenceSites: [
    {
      name: { type: String },
      link: { type: String },
    },
  ],
  externalSites: [
    {
      name: { type: String },
      link: { type: String },
    },
  ],
  author: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  wishlists: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Wishlist" },
  ],
  categories: [{ type: String, required: true }],
  date_created: { type: String, required: true },
  tags: [{ type: String, required: true }],
  price: { type: Number, required: true },
  downloadable: { type: Boolean, required: true },
  viewCount: { type: Number, required: true },
  // review: { type: Number, required: true },
  staredBy: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Article", articleSchema);
