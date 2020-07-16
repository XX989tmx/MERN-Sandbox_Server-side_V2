const express = require("express");
const getExternalApiControllers = require('../controllers/external-api-request');
const router = express.Router();

router.get("/crypto_currency", getExternalApiControllers.getExternalApi);

router.post("/get_value_basedon_currency", getExternalApiControllers.getValueBasedonCurrency)

module.exports = router;