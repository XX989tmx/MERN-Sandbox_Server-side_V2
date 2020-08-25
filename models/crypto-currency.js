const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cryptoCurrencySchema = new Schema({
  last_JPY:{ type: Number, required: true },
  last_USD:{ type: Number, required: true },
  last_AUD:{ type: Number, required: true },
  last_BRL:{ type: Number, required: true },
  last_CAD:{ type: Number, required: true },
  last_CHF:{ type: Number, required: true },
  last_CLP:{ type: Number, required: true },
  last_CNY:{ type: Number, required: true },
  last_DKK:{ type: Number, required: true },
  last_EUR:{ type: Number, required: true },
  last_GBP:{ type: Number, required: true },
  last_HKD:{ type: Number, required: true },
  last_INR:{ type: Number, required: true },
  last_ISK:{ type: Number, required: true },
  last_KRW:{ type: Number, required: true },
  last_NZD:{ type: Number, required: true },
  last_PLN:{ type: Number, required: true },
  last_RUB:{ type: Number, required: true },
  last_SEK:{ type: Number, required: true },
  last_SGD:{ type: Number, required: true },
  last_THB:{ type: Number, required: true },
  last_TRY:{ type: Number, required: true },
  last_TWD:{ type: Number, required: true },
});

module.exports = mongoose.model("CryptoCurrency", cryptoCurrencySchema);
