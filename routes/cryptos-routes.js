const express = require("express");
const router = express.Router();

const cryptosControllers = require("../controllers/cryptos-controllers");


router.get("/index", cryptosControllers.getCryptoIndex);

router.get(
  "/currencies/:queryName",
  cryptosControllers.getSpecificCurrencyInfoByName
);

router.get("/currencies/tag/:tag", cryptosControllers.getCurrencyByTag);
router.get(
  "/currencies/:queryName/ratings",
  cryptosControllers.getSpecificCurrencyRatingByName
);
router.get("/currencies/:queryName/historicalData",cryptosControllers.getSpecificCurrencyWithHistoricalData);
router.get("/currencies/:queryName/market_pairs",cryptosControllers.getSpecificCurrencyAndMarketPairs);

router.get("/categorize_crypto_through_fcas_rank",cryptosControllers.categorizeCryptoThroughFcasRank)

module.exports = router;
