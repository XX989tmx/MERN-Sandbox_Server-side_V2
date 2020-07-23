const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userDetailInfoSchema = new Schema({
  user_id: { type: String, required: true },
  country: { type: String, required: true },
  zip_code: { type: String, required: true },
  todoufuken: { type: String, required: true },
  shichousonku: { type: String, required: true },
  banchi: { type: String, required: true },
  name_of_residence: { type: String, required: true },
  phone_number: { type: String, required: true },
});
module.exports = mongoose.model("UserDetailInfo", userDetailInfoSchema);
