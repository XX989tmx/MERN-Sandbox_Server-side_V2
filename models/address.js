const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  zip_code: { type: String, required: true },
  country: { type: String, required: true },
  name: { type: String, required: true },
  todoufuken: { type: String, required: true },
  address_info1: { type: String, required: true },
  address_info2: { type: String },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
});

module.exports = mongoose.model("Address", addressSchema);
