const express = require("express");
const getExternalApiControllers = require('../controllers/external-api-request');
const router = express.Router();

router.get("/crypto_currency", getExternalApiControllers.getExternalApi);

router.get("/crypto_currency/health_index", getExternalApiControllers.getHealthIndex);

router.get(
  "/crypto_currency/exchange_rate",
  getExternalApiControllers.getExchangeRateBothCurrencyAndCrypto
);

router.get("/crypto_currency/historical_data", getExternalApiControllers.getHistoricalPrice);

router.get("/crypto_currency_data/ranking");

router.get("/crypto_currency_data/all_Currency_price_data");
router.get("/crypto_currency_data/USD/get_current_USD_value");
router.get("/crypto_currency_data/USD/get_current_AUD_value");
router.get("/crypto_currency_data/USD/get_current_BRL_value");
router.get("/crypto_currency_data/USD/get_current_CAD_value");
router.get("/crypto_currency_data/USD/get_current_CHF_value");
router.get("/crypto_currency_data/USD/get_current_CLP_value");
router.get("/crypto_currency_data/USD/get_current_CNY_value");
router.get("/crypto_currency_data/USD/get_current_DKK_value");
router.get("/crypto_currency_data/USD/get_current_EUR_value");
router.get("/crypto_currency_data/USD/get_current_GBP_value");
router.get("/crypto_currency_data/USD/get_current_HKD_value");
router.get("/crypto_currency_data/USD/get_current_INR_value");
router.get("/crypto_currency_data/USD/get_current_ISK_value");
router.get("/crypto_currency_data/USD/get_current_JPY_value");
router.get("/crypto_currency_data/USD/get_current_KRW_value");
router.get("/crypto_currency_data/USD/get_current_NZD_value");
router.get("/crypto_currency_data/USD/get_current_PLN_value");
router.get("/crypto_currency_data/USD/get_current_RUB_value");
router.get("/crypto_currency_data/USD/get_current_SEK_value");
router.get("/crypto_currency_data/USD/get_current_SGD_value");
router.get("/crypto_currency_data/USD/get_current_THB_value");
router.get("/crypto_currency_data/USD/get_current_TRY_value");
router.get("/crypto_currency_data/USD/get_current_TWD_value");


router.get("/crypto_currency_data/USD");
router.get("/crypto_currency_data/AUD");
router.get("/crypto_currency_data/BRL");
router.get("/crypto_currency_data/CAD");
router.get("/crypto_currency_data/CHF");
router.get("/crypto_currency_data/CLP");
router.get("/crypto_currency_data/CNY");
router.get("/crypto_currency_data/DKK");
router.get("/crypto_currency_data/EUR");
router.get("/crypto_currency_data/GBP");
router.get("/crypto_currency_data/HKD");
router.get("/crypto_currency_data/INR");
router.get("/crypto_currency_data/ISK");
router.get("/crypto_currency_data/JPY");
router.get("/crypto_currency_data/KRW");
router.get("/crypto_currency_data/NZD");
router.get("/crypto_currency_data/PLN");
router.get("/crypto_currency_data/RUB");
router.get("/crypto_currency_data/SEK");
router.get("/crypto_currency_data/SGD");
router.get("/crypto_currency_data/THB");
router.get("/crypto_currency_data/TRY");
router.get("/crypto_currency_data/TWD");


router.get("/crypto_currency_data/USD/last_1day_change");
router.get("/crypto_currency_data/USD/last_1week_change");
router.get("/crypto_currency_data/USD/last_1month_change");
router.get("/crypto_currency_data/USD/last_1year_change");
router.get("/crypto_currency_data/USD/last_5year_change");
router.get("/crypto_currency_data/USD/last_10year_change");



router.post("/get_value_basedon_currency", getExternalApiControllers.getValueBasedonCurrency)

module.exports = router;