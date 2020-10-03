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

module.exports = router;
