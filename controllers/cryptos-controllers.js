const CryptoCurrency = require("../constructor/crypto-constructor");
const CoinMarketCapCrypto = require("../models/coinmarketcap-crypto");
const HttpError = require("../models/http-error");

const getCryptoIndex = async (req, res, next) => {
  let cryptos;
  try {
    cryptos = await CoinMarketCapCrypto.find({}, "-article");
  } catch (error) {
    console.log(error);
  }

  console.log(cryptos);

  if (!cryptos) {
    const error = new HttpError("No Crypto Data Was Found.", 500);
    return next(error);
  }

  res
    .status(200)
    .json({ cryptos: cryptos.map((v) => v.toObject({ getters: true })) });
};

const getSpecificCurrencyInfoByName = async (req, res, next) => {
  //this is not currency.name, but currency.queryName.
  const queryName = req.params.queryName;

  let crypto;
  try {
    crypto = await CoinMarketCapCrypto.find({ queryName: queryName });
  } catch (error) {
    console.log(error);
  }
  console.log(crypto);
  console.log(crypto.length);
  console.log(Array.isArray(crypto));

  if (!crypto) {
    const error = new HttpError(
      "No Data Found For the Specified Currency",
      500
    );
    return next(error);
  }

  // const matchedCurrency = cryptoArray.filter(function (v, i) {
  //   return v.queryName === queryName;
  // });

  res
    .status(200)
    .json({ crypto: crypto.map((v) => v.toObject({ getters: true })) });
};

const getSpecificCurrencyRatingByName = async (req, res, next) => {
  //this is not currency.name, but currency.queryName.
  const queryName = req.params.queryName;

  let crypto;
  try {
    crypto = await CoinMarketCapCrypto.find({ queryName: queryName });
  } catch (error) {
    console.log(error);
  }
  console.log(crypto);
  console.log(Array.isArray(crypto));

  if (!crypto) {
    const error = new HttpError(
      "No Data Found For the Specified Currency",
      500
    );
    return next(error);
  }

  // const matchedCurrency = cryptoArray.filter(function (v, i) {
  //   return v.queryName === queryName;
  // });

  res
    .status(200)
    .json({ crypto: crypto.map((v) => v.toObject({ getters: true })) });
};

const getCurrencyByTag = async (req, res, next) => {
  const tag = req.params.tag;

  let crypto;
  try {
    crypto = await CoinMarketCapCrypto.find({ tags: tag });
  } catch (error) {
    console.log(error);
  }

  //console log
  console.log(crypto);
  console.log(crypto.length);
  console.log(Array.isArray(crypto));
  for (let index = 0; index < crypto.length; index++) {
    const element = crypto[index];
    console.log(element.tags);
  }

  // case no data found
  if (!crypto) {
    const error = new HttpError(
      "No Data Found For the Specified Currency",
      500
    );
    return next(error);
  }

  res
    .status(200)
    .json({ crypto: crypto.map((v) => v.toObject({ getters: true })) });
};

const getSpecificCurrencyWithHistoricalData = async (req, res, next) => {
  const queryName = req.params.queryName;

  let crypto;
  try {
    crypto = await CoinMarketCapCrypto.find({ queryName: queryName });
  } catch (error) {
    console.log(error);
  }
  console.log(crypto);
  console.log(crypto.length);
  console.log(Array.isArray(crypto));

  //
  // getting historical data here
  //

  if (!crypto) {
    const error = new HttpError(
      "No Data Found For the Specified Currency",
      500
    );
    return next(error);
  }

  // const matchedCurrency = cryptoArray.filter(function (v, i) {
  //   return v.queryName === queryName;
  // });

  console.log("histocial data");

  res
    .status(200)
    .json({ crypto: crypto.map((v) => v.toObject({ getters: true })) });
};

exports.getCryptoIndex = getCryptoIndex;

exports.getSpecificCurrencyInfoByName = getSpecificCurrencyInfoByName;
exports.getSpecificCurrencyRatingByName = getSpecificCurrencyRatingByName;
exports.getCurrencyByTag = getCurrencyByTag;
exports.getSpecificCurrencyWithHistoricalData = getSpecificCurrencyWithHistoricalData;
