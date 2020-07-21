const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cryptoSchema = new Schema({
  currency_name: { type: String, required: true },
  last: { type: Number, required: true },
  buy: { type: Number, required: true },
  sell: { type: Number, required: true },
  symbol: { type: String, required: true },
  timestamp: { type: String, required: true },
});

module.exports = mongoose.model("Crypto", cryptoSchema);