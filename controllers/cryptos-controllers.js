const CryptoCurrency = require("../constructor/crypto-constructor");
const CoinMarketCapCrypto = require("../models/coinmarketcap-crypto");
const HttpError = require("../models/http-error");

const getCryptoIndex = async (req, res, next) => {
  let cryptos;
  try {
    cryptos = await CoinMarketCapCrypto.find({}, "-article").sort({ _id: 1 });
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

const getSpecificCurrencyAndMarketPairs = async (req, res, next) => {
  const queryName = req.params.queryName;

  let crypto;
  try {
    crypto = await CoinMarketCapCrypto.find({ queryName: queryName });
  } catch (error) {
    console.log(error);
  }
  console.log(crypto);
  console.log(Array.isArray(crypto));

  //
  // gets market pairs data and execute necessary logic.
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
  if (!!crypto) {
    console.log("market pairs");
  }

  res
    .status(200)
    .json({ crypto: crypto.map((v) => v.toObject({ getters: true })) });
};

const categorizeCryptoThroughFcasRank = async(req,res,next) => {
  const _5ArraySortedBasedOnFcasScore = await (async function (params) {
    const fcasScoreArray = await (async function IFFY(params) {
      let cryptos = await CoinMarketCapCrypto.find({}); // CoinbaeCrypto Mongo Docs
      let fcasScoreArray = [];

      for (let i = 0; i < cryptos.length; i++) {
        const element = cryptos[i];
        const fcasScore = Number(element.fcasScore);
        fcasScoreArray.push(fcasScore);
      }

      return fcasScoreArray;
    })();

    const Superb = fcasScoreArray.filter((v, i) => {
      return v >= 900 && v <= 1000;
    });
    console.log(Superb);

    const Attractive = fcasScoreArray.filter((v, i) => {
      return v >= 750 && v <= 899;
    });
    console.log(Attractive);

    const Basic = fcasScoreArray.filter((v, i) => {
      return v >= 650 && v <= 749;
    });
    console.log(Basic);

    const Caution = fcasScoreArray.filter((v, i) => {
      return v >= 500 && v <= 649;
    });
    console.log(Caution);

    const Fragile = fcasScoreArray.filter((v, i) => {
      return v < 500;
    });
    console.log(Fragile);

    //contains only Superb rated crypto docs
    let SuperbRatedCryptoArray = [];
    for (let i = 0; i < Superb.length; i++) {
      const SfcasSocre = String(Superb[i]);
      const docWithSuperbRating = await CoinMarketCapCrypto.find({
        fcasScore: SfcasSocre,
      });
      SuperbRatedCryptoArray.push(docWithSuperbRating.pop());
    }
    console.log("S cryptos");
    console.log(SuperbRatedCryptoArray);

    //contains only Attractive rated crypto docs
    let AttractiveRatedCryptoArray = [];
    for (let i = 0; i < Attractive.length; i++) {
      const AfcasSocre = Attractive[i];
      const docWithAttractiveRating = await CoinMarketCapCrypto.find({
        fcasScore: String(AfcasSocre),
      });
      AttractiveRatedCryptoArray.push(docWithAttractiveRating.pop());
    }
    console.log("A cryptos");
    console.log(AttractiveRatedCryptoArray);

    let BasicRatedCryptoArray = [];
    for (let i = 0; i < Basic.length; i++) {
      const BfcasSocre = Basic[i];
      const docWithBasicRating = await CoinMarketCapCrypto.find({
        fcasScore: String(BfcasSocre),
      });
      BasicRatedCryptoArray.push(docWithBasicRating.pop());
    }

    let CautionRatedCryptoArray = [];
    for (let i = 0; i < Caution.length; i++) {
      const CfcasSocre = Caution[i];
      const docWithCautionRating = await CoinMarketCapCrypto.find({
        fcasScore: String(CfcasSocre),
      });
      CautionRatedCryptoArray.push(docWithCautionRating.pop());
    }

    let FragileRatedCryptoArray = [];
    for (let i = 0; i < Fragile.length; i++) {
      const FfcasSocre = Fragile[i];
      const docWithFragileRating = await CoinMarketCapCrypto.find({
        fcasScore: String(FfcasSocre),
      });
      FragileRatedCryptoArray.push(docWithFragileRating.pop());
    }

    const _5ArraySortedBasedOnFcasScore = {
      SuperbRatedCryptoArray,
      AttractiveRatedCryptoArray,
      BasicRatedCryptoArray,
      CautionRatedCryptoArray,
      FragileRatedCryptoArray,
    };

    return _5ArraySortedBasedOnFcasScore;
  })();


  res.status(200).json({ _5ArraySortedBasedOnFcasScore });
}

exports.getCryptoIndex = getCryptoIndex;

exports.getSpecificCurrencyInfoByName = getSpecificCurrencyInfoByName;
exports.getSpecificCurrencyRatingByName = getSpecificCurrencyRatingByName;
exports.getCurrencyByTag = getCurrencyByTag;
exports.getSpecificCurrencyWithHistoricalData = getSpecificCurrencyWithHistoricalData;
exports.getSpecificCurrencyAndMarketPairs = getSpecificCurrencyAndMarketPairs;
exports.categorizeCryptoThroughFcasRank = categorizeCryptoThroughFcasRank; 