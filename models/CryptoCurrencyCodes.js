const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cryptoCurrencyCodeSchema = new Schema({
  currency_name: { type: String },
  currency_code: { type: String },
});

module.exports = mongoose.model(
  "CryptoCurrencyCodes",
  cryptoCurrencyCodeSchema,
  "CryptoCurrencyCodes"
);
