const express = require("express");

const axios = require("axios");
const bodyParser = require("body-parser");
const util = require("util");
const mongoose = require("mongoose");

const getCryptoTicker = require("../util/crypto-ticker");
const getBTCIndex = require("../util/getBTCHealthIndex");
const CryptoCurrency = require("../models/crypto-currency");

const Crypto = require("../models/crypto");

const getExternalApi = async (req, res, next) => {
  //   const converter = async function (currency, value) {
  //       // const c_to_f_response = await axios.get(`https://blockchain.info/tobtc?currency=${currency}&value=${value}`);
  //   // const c_to_f_data = c_to_f_response.data;
  // //   console.log(c_to_f_data);
  //   }
  //   converter(currency, value);

  //   let response;
  //   let data;
  //   let last_price_based_on_USD;
  //   let symbol;

  //    const getCryptoData = async (params) => {
  // let url = "https://blockchain.info/ticker";
  // axios
  //   .get(url)
  //   .then((response) => {
  //     const data = response.data;
  //     console.log(data);
  //     const last_price_based_on_USD = data.USD.last;
  //     console.log(last_price_based_on_USD);
  //     const symbol = data.USD.symbol;

  //     // return last_price_based_on_USD;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //    }
  // var Rating = getBTCIndex();
  // console.log(Rating);

  let previousCurrencyPrice;
  try {
    previousCurrencyPrice = await CryptoCurrency.findOne().sort({ _id: -1 });
  } catch (error) {}

  //get fcasRating
  let BTCHealthIndexResponse;
  let BTCHealthIndexData;
  let fcasRating;
  let fcasScore;
  try {
    BTCHealthIndexResponse = await axios.get(
      `https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=BTC&apikey=${process.env.ALPHA_ADVANTAGE_API_KEY}`
    );
    BTCHealthIndexData = BTCHealthIndexResponse.data;
    fcasRating = BTCHealthIndexData["Crypto Rating (FCAS)"]["3. fcas rating"];
    fcasScore = BTCHealthIndexData["Crypto Rating (FCAS)"]["4. fcas score"];
  } catch (error) {}

  const response = await axios.get("https://blockchain.info/ticker");

  const data = response.data;
  console.log(data);

  // USD

  const last_USD = data.USD.last;
  const buy_USD = data.USD.buy;
  const sell_USD = data.USD.sell;
  const symbol_USD = data.USD.symbol;
  console.log(last_USD);
  console.log(buy_USD);
  console.log(sell_USD);
  console.log(symbol_USD);
  const USD = `current exchange rate is ${symbol_USD}${last_USD} based on USD`;

  // const savedUSDCryptoInfo = new Crypto({
  //   currency_name: "USD",
  //   last: last_USD,
  //   buy: buy_USD,
  //   sell: sell_USD,
  //   symbol: symbol_USD,
  //   timestamp: new Date(Date.now()).toString()
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedUSDCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log('Saving USD data to database was successful.');
  // } catch (error) {

  // }

  // const USD_DATA = {
  //   last_USD: last_USD,
  //   buy_USD: buy_USD,
  //   sell_USD: sell_USD,
  //   symbol_USD: symbol_USD,
  // };

  // AUD
  const last_AUD = data.AUD.last;
  const buy_AUD = data.AUD.buy;
  const sell_AUD = data.AUD.sell;
  const symbol_AUD = data.AUD.symbol;
  console.log(last_AUD);
  console.log(buy_AUD);
  console.log(sell_AUD);
  console.log(symbol_AUD);
  const AUD = `current exchange rate is ${symbol_AUD}${last_AUD} based on AUD`;

  // const savedAUDCryptoInfo = new Crypto({
  //   currency_name: "AUD",
  //   last: last_AUD,
  //   buy: buy_AUD,
  //   sell: sell_AUD,
  //   symbol: symbol_AUD,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedAUDCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving AUD data to database was successful.");
  // } catch (error) {}

  // BRL
  const last_BRL = data.BRL.last;
  const buy_BRL = data.BRL.buy;
  const sell_BRL = data.BRL.sell;
  const symbol_BRL = data.BRL.symbol;
  console.log(last_BRL);
  console.log(buy_BRL);
  console.log(sell_BRL);
  console.log(symbol_BRL);
  const BRL = `current exchange rate is ${symbol_BRL}${last_BRL} based on BRL`;

  // const savedBRLCryptoInfo = new Crypto({
  //   currency_name: "BRL",
  //   last: last_BRL,
  //   buy: buy_BRL,
  //   sell: sell_BRL,
  //   symbol: symbol_BRL,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedBRLCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving BRL data to database was successful.");
  // } catch (error) {}

  // CAD
  const last_CAD = data.CAD.last;
  const buy_CAD = data.CAD.buy;
  const sell_CAD = data.CAD.sell;
  const symbol_CAD = data.CAD.symbol;
  console.log(last_CAD);
  console.log(buy_CAD);
  console.log(sell_CAD);
  console.log(symbol_CAD);
  const CAD = `current exchange rate is ${symbol_CAD}${last_CAD} based on CAD`;

  // const savedCADCryptoInfo = new Crypto({
  //   currency_name: "CAD",
  //   last: last_CAD,
  //   buy: buy_CAD,
  //   sell: sell_CAD,
  //   symbol: symbol_CAD,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedCADCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving CAD data to database was successful.");
  // } catch (error) {}

  // CHF
  const last_CHF = data.CHF.last;
  const buy_CHF = data.CHF.buy;
  const sell_CHF = data.CHF.sell;
  const symbol_CHF = data.CHF.symbol;
  console.log(last_CHF);
  console.log(buy_CHF);
  console.log(sell_CHF);
  console.log(symbol_CHF);
  const CHF = `current exchange rate is ${symbol_CHF}${last_CHF} based on CAD`;

  // const savedCHFCryptoInfo = new Crypto({
  //   currency_name: "CHF",
  //   last: last_CHF,
  //   buy: buy_CHF,
  //   sell: sell_CHF,
  //   symbol: symbol_CHF,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedCHFCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving CHF data to database was successful.");
  // } catch (error) {}

  // CLP
  const last_CLP = data.CLP.last;
  const buy_CLP = data.CLP.buy;
  const sell_CLP = data.CLP.sell;
  const symbol_CLP = data.CLP.symbol;
  console.log(last_CLP);
  console.log(buy_CLP);
  console.log(sell_CLP);
  console.log(symbol_CLP);
  const CLP = `current exchange rate is ${symbol_CLP}${last_CLP} based on CLP`;

  // const savedCLPCryptoInfo = new Crypto({
  //   currency_name: "CLP",
  //   last: last_CLP,
  //   buy: buy_CLP,
  //   sell: sell_CLP,
  //   symbol: symbol_CLP,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedCLPCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving CLP data to database was successful.");
  // } catch (error) {}

  // CNY
  const last_CNY = data.CNY.last;
  const buy_CNY = data.CNY.buy;
  const sell_CNY = data.CNY.sell;
  const symbol_CNY = data.CNY.symbol;
  console.log(last_CNY);
  console.log(buy_CNY);
  console.log(sell_CNY);
  console.log(symbol_CNY);
  const CNY = `current exchange rate is ${symbol_CNY}${last_CNY} based on CNY`;

  // const savedCNYCryptoInfo = new Crypto({
  //   currency_name: "CNY",
  //   last: last_CNY,
  //   buy: buy_CNY,
  //   sell: sell_CNY,
  //   symbol: symbol_CNY,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedCNYCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving CNY data to database was successful.");
  // } catch (error) {}

  // DKK
  const last_DKK = data.DKK.last;
  const buy_DKK = data.DKK.buy;
  const sell_DKK = data.DKK.sell;
  const symbol_DKK = data.DKK.symbol;
  console.log(last_DKK);
  console.log(buy_DKK);
  console.log(sell_DKK);
  console.log(symbol_DKK);
  const DKK = `current exchange rate is ${symbol_DKK}${last_DKK} based on DKK`;

  // const savedDKKCryptoInfo = new Crypto({
  //   currency_name: "DKK",
  //   last: last_DKK,
  //   buy: buy_DKK,
  //   sell: sell_DKK,
  //   symbol: symbol_DKK,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedDKKCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving DKK data to database was successful.");
  // } catch (error) {}

  // EUR
  const last_EUR = data.EUR.last;
  const buy_EUR = data.EUR.buy;
  const sell_EUR = data.EUR.sell;
  const symbol_EUR = data.EUR.symbol;
  console.log(last_EUR);
  console.log(buy_EUR);
  console.log(sell_EUR);
  console.log(symbol_EUR);
  const EUR = `current exchange rate is ${symbol_EUR}${last_EUR} based on EUR`;

  // const savedEURCryptoInfo = new Crypto({
  //   currency_name: "EUR",
  //   last: last_EUR,
  //   buy: buy_EUR,
  //   sell: sell_EUR,
  //   symbol: symbol_EUR,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedEURCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving EUR data to database was successful.");
  // } catch (error) {}

  // GBP
  const last_GBP = data.GBP.last;
  const buy_GBP = data.GBP.buy;
  const sell_GBP = data.GBP.sell;
  const symbol_GBP = data.GBP.symbol;
  console.log(last_GBP);
  console.log(buy_GBP);
  console.log(sell_GBP);
  console.log(symbol_GBP);
  const GBP = `current exchange rate is ${symbol_GBP}${last_GBP} based on GBP`;

  // const savedGBPCryptoInfo = new Crypto({
  //   currency_name: "GBP",
  //   last: last_GBP,
  //   buy: buy_GBP,
  //   sell: sell_GBP,
  //   symbol: symbol_GBP,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedGBPCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving GBP data to database was successful.");
  // } catch (error) {}

  // HKD
  const last_HKD = data.HKD.last;
  const buy_HKD = data.HKD.buy;
  const sell_HKD = data.HKD.sell;
  const symbol_HKD = data.HKD.symbol;
  console.log(last_HKD);
  console.log(buy_HKD);
  console.log(sell_HKD);
  console.log(symbol_HKD);
  const HKD = `current exchange rate is ${symbol_HKD}${last_HKD} based on HKD`;

  // const savedHKDCryptoInfo = new Crypto({
  //   currency_name: "HKD",
  //   last: last_HKD,
  //   buy: buy_HKD,
  //   sell: sell_HKD,
  //   symbol: symbol_HKD,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedHKDCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving HKD data to database was successful.");
  // } catch (error) {}

  // INR
  const last_INR = data.INR.last;
  const buy_INR = data.INR.buy;
  const sell_INR = data.INR.sell;
  const symbol_INR = data.INR.symbol;
  console.log(last_INR);
  console.log(buy_INR);
  console.log(sell_INR);
  console.log(symbol_INR);
  const INR = `current exchange rate is ${symbol_INR}${last_INR} based on INR`;

  // const savedINRCryptoInfo = new Crypto({
  //   currency_name: "INR",
  //   last: last_INR,
  //   buy: buy_INR,
  //   sell: sell_INR,
  //   symbol: symbol_INR,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedINRCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving INR data to database was successful.");
  // } catch (error) {}

  // ISK
  const last_ISK = data.ISK.last;
  const buy_ISK = data.ISK.buy;
  const sell_ISK = data.ISK.sell;
  const symbol_ISK = data.ISK.symbol;
  console.log(last_ISK);
  console.log(buy_ISK);
  console.log(sell_ISK);
  console.log(symbol_ISK);
  const ISK = `current exchange rate is ${symbol_ISK}${last_ISK} based on ISK`;

  // const savedISKCryptoInfo = new Crypto({
  //   currency_name: "ISK",
  //   last: last_ISK,
  //   buy: buy_ISK,
  //   sell: sell_ISK,
  //   symbol: symbol_ISK,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedISKCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving ISK data to database was successful.");
  // } catch (error) {}

  // JPY
  const last_JPY = data.JPY.last;
  const buy_JPY = data.JPY.buy;
  const sell_JPY = data.JPY.sell;
  const symbol_JPY = data.JPY.symbol;
  console.log(last_JPY);
  console.log(buy_JPY);
  console.log(sell_JPY);
  console.log(symbol_JPY);
  const JPY = `current exchange rate is  ${symbol_JPY}${last_JPY} yen based on JPY`;

  // const savedJPYCryptoInfo = new Crypto({
  //   currency_name: "JPY",
  //   last: last_JPY,
  //   buy: buy_JPY,
  //   sell: sell_JPY,
  //   symbol: symbol_JPY,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedJPYCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving JPY data to database was successful.");
  // } catch (error) {}

  // KRW
  const last_KRW = data.KRW.last;
  const buy_KRW = data.KRW.buy;
  const sell_KRW = data.KRW.sell;
  const symbol_KRW = data.KRW.symbol;
  console.log(last_KRW);
  console.log(buy_KRW);
  console.log(sell_KRW);
  console.log(symbol_KRW);
  const KRW = `current exchange rate is  ${symbol_KRW}${last_KRW}  based on KRW`;

  // const savedKRWCryptoInfo = new Crypto({
  //   currency_name: "KRW",
  //   last: last_KRW,
  //   buy: buy_KRW,
  //   sell: sell_KRW,
  //   symbol: symbol_KRW,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedKRWCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving KRW data to database was successful.");
  // } catch (error) {}

  // NZD
  const last_NZD = data.NZD.last;
  const buy_NZD = data.NZD.buy;
  const sell_NZD = data.NZD.sell;
  const symbol_NZD = data.NZD.symbol;
  console.log(last_NZD);
  console.log(buy_NZD);
  console.log(sell_NZD);
  console.log(symbol_NZD);
  const NZD = `current exchange rate is  ${symbol_NZD}${last_NZD}  based on NZD`;

  // const savedNZDCryptoInfo = new Crypto({
  //   currency_name: "NZD",
  //   last: last_NZD,
  //   buy: buy_NZD,
  //   sell: sell_NZD,
  //   symbol: symbol_NZD,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedNZDCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving NZD data to database was successful.");
  // } catch (error) {}

  // PLN
  const last_PLN = data.PLN.last;
  const buy_PLN = data.PLN.buy;
  const sell_PLN = data.PLN.sell;
  const symbol_PLN = data.PLN.symbol;
  console.log(last_PLN);
  console.log(buy_PLN);
  console.log(sell_PLN);
  console.log(symbol_PLN);
  const PLN = `current exchange rate is  ${symbol_PLN}${last_PLN}  based on PLN`;

  // const savedPLNCryptoInfo = new Crypto({
  //   currency_name: "PLN",
  //   last: last_PLN,
  //   buy: buy_PLN,
  //   sell: sell_PLN,
  //   symbol: symbol_PLN,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedPLNCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving PLN data to database was successful.");
  // } catch (error) {}

  // RUB
  const last_RUB = data.RUB.last;
  const buy_RUB = data.RUB.buy;
  const sell_RUB = data.RUB.sell;
  const symbol_RUB = data.RUB.symbol;
  console.log(last_RUB);
  console.log(buy_RUB);
  console.log(sell_RUB);
  console.log(symbol_RUB);
  const RUB = `current exchange rate is  ${symbol_RUB}${last_RUB}  based on RUB`;

  // const savedRUBCryptoInfo = new Crypto({
  //   currency_name: "RUB",
  //   last: last_RUB,
  //   buy: buy_RUB,
  //   sell: sell_RUB,
  //   symbol: symbol_RUB,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedRUBCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving RUB data to database was successful.");
  // } catch (error) {}

  // SEK
  const last_SEK = data.SEK.last;
  const buy_SEK = data.SEK.buy;
  const sell_SEK = data.SEK.sell;
  const symbol_SEK = data.SEK.symbol;
  console.log(last_SEK);
  console.log(buy_SEK);
  console.log(sell_SEK);
  console.log(symbol_SEK);
  const SEK = `current exchange rate is  ${symbol_SEK}${last_SEK}  based on SEK`;

  // const savedSEKCryptoInfo = new Crypto({
  //   currency_name: "SEK",
  //   last: last_SEK,
  //   buy: buy_SEK,
  //   sell: sell_SEK,
  //   symbol: symbol_SEK,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedSEKCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving SEK data to database was successful.");
  // } catch (error) {}

  // SGD
  const last_SGD = data.SGD.last;
  const buy_SGD = data.SGD.buy;
  const sell_SGD = data.SGD.sell;
  const symbol_SGD = data.SGD.symbol;
  console.log(last_SGD);
  console.log(buy_SGD);
  console.log(sell_SGD);
  console.log(symbol_SGD);
  const SGD = `current exchange rate is  ${symbol_SGD}${last_SGD}  based on SGD`;

  // const savedSGDCryptoInfo = new Crypto({
  //   currency_name: "SGD",
  //   last: last_SGD,
  //   buy: buy_SGD,
  //   sell: sell_SGD,
  //   symbol: symbol_SGD,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedSGDCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving SGD data to database was successful.");
  // } catch (error) {}

  // THB
  const last_THB = data.THB.last;
  const buy_THB = data.THB.buy;
  const sell_THB = data.THB.sell;
  const symbol_THB = data.THB.symbol;
  console.log(last_THB);
  console.log(buy_THB);
  console.log(sell_THB);
  console.log(symbol_THB);
  const THB = `current exchange rate is  ${symbol_THB}${last_THB}  based on THB`;

  // const savedTHBCryptoInfo = new Crypto({
  //   currency_name: "THB",
  //   last: last_THB,
  //   buy: buy_THB,
  //   sell: sell_THB,
  //   symbol: symbol_THB,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedTHBCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving THB data to database was successful.");
  // } catch (error) {}

  // TRY
  const last_TRY = data.TRY.last;
  const buy_TRY = data.TRY.buy;
  const sell_TRY = data.TRY.sell;
  const symbol_TRY = data.TRY.symbol;
  console.log(last_TRY);
  console.log(buy_TRY);
  console.log(sell_TRY);
  console.log(symbol_TRY);
  const TRY = `current exchange rate is  ${symbol_TRY}${last_TRY}  based on TRY`;

  // const savedTRYCryptoInfo = new Crypto({
  //   currency_name: "TRY",
  //   last: last_TRY,
  //   buy: buy_TRY,
  //   sell: sell_TRY,
  //   symbol: symbol_TRY,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedTRYCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving TRY data to database was successful.");
  // } catch (error) {}

  // TWD
  const last_TWD = data.TWD.last;
  const buy_TWD = data.TWD.buy;
  const sell_TWD = data.TWD.sell;
  const symbol_TWD = data.TWD.symbol;
  console.log(last_TWD);
  console.log(buy_TWD);
  console.log(sell_TWD);
  console.log(symbol_TWD);
  const TWD = `current exchange rate is  ${symbol_TWD}${last_TWD}  based on TWD`;

  // const savedTWDCryptoInfo = new Crypto({
  //   currency_name: "TWD",
  //   last: last_TWD,
  //   buy: buy_TWD,
  //   sell: sell_TWD,
  //   symbol: symbol_TWD,
  //   timestamp: new Date(Date.now()).toString(),
  // });

  // try {
  //   const sess = await mongoose.startSession();
  //   sess.startTransaction();
  //   await savedTWDCryptoInfo.save({ session: sess });
  //   await sess.commitTransaction();
  //   console.log("Saving TWD data to database was successful.");
  // } catch (error) {}

  // let USD;
  // try {
  //   USD =  await getCryptoTicker();
  // } catch (error) {

  // }

  // let last_price_array = [];
  // last_price_array.push(last_TWD, last_USD, last_JPY, last_THB);
  // last_price_array.sort();
  // console.log(last_price_array);

  // const c_to_USD_price = data.USD;

  // let buy = data.USD.buy;
  // let sell = data.USD.sell;
  // let symbol = data.USD.symbol;
  // const final_response = `current exchange rate is ${sell} based on USD`;
  //   console.log(
  //     `current exchange rate is ${symbol}${last_price_based_on_USD} based on USD`
  //   );
  // await console.log(`current exchange rate is ${symbol}${sell} based on USD` );

  // let something = data;

  // let finalResponse = `todays price is ${something}`

  // console.log(c_to_f_data);

  var lastValueOfEveryCurrency = {
    last_JPY,
    last_USD,
    last_AUD,
    last_BRL,
    last_CAD,
    last_CHF,
    last_CLP,
    last_CNY,
    last_DKK,
    last_EUR,
    last_GBP,
    last_HKD,
    last_INR,
    last_ISK,
    last_KRW,
    last_NZD,
    last_PLN,
    last_RUB,
    last_SEK,
    last_SGD,
    last_THB,
    last_TRY,
    last_TWD,
  };

  let priceDifferenceBetweenPreviousAndLatest = {
    JPY: lastValueOfEveryCurrency.last_JPY - previousCurrencyPrice.last_JPY,
    USD: lastValueOfEveryCurrency.last_USD - previousCurrencyPrice.last_USD,
    AUD: lastValueOfEveryCurrency.last_AUD - previousCurrencyPrice.last_AUD,
    BRL: lastValueOfEveryCurrency.last_BRL - previousCurrencyPrice.last_BRL,
    CAD: lastValueOfEveryCurrency.last_CAD - previousCurrencyPrice.last_CAD,
    CHF: lastValueOfEveryCurrency.last_CHF - previousCurrencyPrice.last_CHF,
    CLP: lastValueOfEveryCurrency.last_CLP - previousCurrencyPrice.last_CLP,
    CNY: lastValueOfEveryCurrency.last_CNY - previousCurrencyPrice.last_CNY,
    DKK: lastValueOfEveryCurrency.last_DKK - previousCurrencyPrice.last_DKK,
    EUR: lastValueOfEveryCurrency.last_EUR - previousCurrencyPrice.last_EUR,
    GBP: lastValueOfEveryCurrency.last_GBP - previousCurrencyPrice.last_GBP,
    HKD: lastValueOfEveryCurrency.last_HKD - previousCurrencyPrice.last_HKD,
    INR: lastValueOfEveryCurrency.last_INR - previousCurrencyPrice.last_INR,
    ISK: lastValueOfEveryCurrency.last_ISK - previousCurrencyPrice.last_ISK,
    KRW: lastValueOfEveryCurrency.last_KRW - previousCurrencyPrice.last_KRW,
    NZD: lastValueOfEveryCurrency.last_NZD - previousCurrencyPrice.last_NZD,
    PLN: lastValueOfEveryCurrency.last_PLN - previousCurrencyPrice.last_PLN,
    RUB: lastValueOfEveryCurrency.last_RUB - previousCurrencyPrice.last_RUB,
    SEK: lastValueOfEveryCurrency.last_SEK - previousCurrencyPrice.last_SEK,
    SGD: lastValueOfEveryCurrency.last_SGD - previousCurrencyPrice.last_SGD,
    THB: lastValueOfEveryCurrency.last_THB - previousCurrencyPrice.last_THB,
    TRY: lastValueOfEveryCurrency.last_TRY - previousCurrencyPrice.last_TRY,
    TWD: lastValueOfEveryCurrency.last_TWD - previousCurrencyPrice.last_TWD,
  };

  const cryptoLastPriceAll = new CryptoCurrency({
    last_JPY: lastValueOfEveryCurrency.last_JPY,
    last_USD: lastValueOfEveryCurrency.last_USD,
    last_AUD: lastValueOfEveryCurrency.last_AUD,
    last_BRL: lastValueOfEveryCurrency.last_BRL,
    last_CAD: lastValueOfEveryCurrency.last_CAD,
    last_CHF: lastValueOfEveryCurrency.last_CHF,
    last_CLP: lastValueOfEveryCurrency.last_CLP,
    last_CNY: lastValueOfEveryCurrency.last_CNY,
    last_DKK: lastValueOfEveryCurrency.last_DKK,
    last_EUR: lastValueOfEveryCurrency.last_EUR,
    last_GBP: lastValueOfEveryCurrency.last_GBP,
    last_HKD: lastValueOfEveryCurrency.last_HKD,
    last_INR: lastValueOfEveryCurrency.last_INR,
    last_ISK: lastValueOfEveryCurrency.last_ISK,
    last_KRW: lastValueOfEveryCurrency.last_KRW,
    last_NZD: lastValueOfEveryCurrency.last_NZD,
    last_PLN: lastValueOfEveryCurrency.last_PLN,
    last_RUB: lastValueOfEveryCurrency.last_RUB,
    last_SEK: lastValueOfEveryCurrency.last_SEK,
    last_SGD: lastValueOfEveryCurrency.last_SGD,
    last_THB: lastValueOfEveryCurrency.last_THB,
    last_TRY: lastValueOfEveryCurrency.last_TRY,
    last_TWD: lastValueOfEveryCurrency.last_TWD,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await cryptoLastPriceAll.save({ session: sess });
    await sess.commitTransaction();
    console.log("Saving TWD data to database was successful.");
  } catch (error) {}

  var currencySymbolOfEveryCurrency = {
    symbol_JPY,
    symbol_USD,
    symbol_AUD,
    symbol_BRL,
    symbol_CAD,
    symbol_CHF,
    symbol_CLP,
    symbol_CNY,
    symbol_DKK,
    symbol_EUR,
    symbol_GBP,
    symbol_HKD,
    symbol_INR,
    symbol_ISK,
    symbol_KRW,
    symbol_NZD,
    symbol_PLN,
    symbol_RUB,
    symbol_SEK,
    symbol_SGD,
    symbol_THB,
    symbol_TRY,
    symbol_TWD,
  };

  console.log(lastValueOfEveryCurrency.last_JPY);
  console.log(currencySymbolOfEveryCurrency.symbol_JPY);

  console.log(util.isNumber(last_HKD));
  console.log(util.isNumber(buy_HKD));
  console.log(util.isNumber(sell_HKD));
  console.log(util.isString(symbol_HKD));
  console.log(util.isString(new Date(Date.now()).toString()));
  // console.log(Number.isInteger(last_HKD));
  console.log(priceDifferenceBetweenPreviousAndLatest);

  res.json({
    exchange_rate: `${JPY},${USD},${AUD},${BRL},${CAD},${CHF},${CLP},${CNY},${DKK},${EUR},${GBP},${HKD},${INR},${ISK},${KRW},${NZD},${PLN},${RUB},${SEK},${SGD},${THB},${TRY},${TWD}`,
    lastValueOfEveryCurrency: lastValueOfEveryCurrency,
    currencySymbolOfEveryCurrency: currencySymbolOfEveryCurrency,
    fcasRating: fcasRating,
    fcasScore: fcasScore,
    priceDifferenceBetweenPreviousAndLatest,
  });
};

const getValueBasedonCurrency = async (req, res, next) => {
  const { currency, value } = req.body;
  console.log(currency);

  let valueBasedOnCurrency;

  try {
    valueBasedOnCurrency = await getCryptoTicker(currency, value);
    console.log(valueBasedOnCurrency);
  } catch (error) {}

  res.json({ value_based_on_your_currency: valueBasedOnCurrency });
};

const getHistoricalPrice = async (req, res, next) => {
  const response = await axios.get(
    `https://api.coindesk.com/v1/bpi/historical/close.json?start=${encodeURIComponent(
      req.query.start
    )}&end=${encodeURIComponent(req.query.end)}`
  );
  // const response = await axios.get(
  //   "https://api.coindesk.com/v1/bpi/historical/close.json?start=2020-07-01&end=2020-07-31 "
  // );

  const data = response.data;
  console.log(data);
  console.log(Object.keys(data.bpi));
  console.log(Object.values(data.bpi));
  console.log(data.bpi["2020-05-30"]);
  console.log(data.bpi["2020-08-01"]);

  let historicalPrice2020_1m1_to8m1;
  historicalPrice2020_1m1_to8m1 = Object.values(data.bpi);
  console.log(historicalPrice2020_1m1_to8m1);

  let dateStringArray;
  dateStringArray = Object.keys(data.bpi);
  console.log(dateStringArray);

  let historicalPriceData;
  historicalPriceData = Object.values(data.bpi);
  console.log(historicalPriceData);

  res.json({ dateStringArray, historicalPriceData });
};

const getHealthIndex = async (req, res, next) => {
  let response;
  try {
    response = await axios.get(
      `https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=${req.query.cryptoCode}&apikey=${process.env.ALPHA_ADVANTAGE_API_KEY}`
    );
  } catch (error) {}

  console.log(response);
  console.log(response.data);

  let data = response.data;
  console.log(data["Crypto Rating (FCAS)"]);
  let symbol = data["Crypto Rating (FCAS)"]["1. symbol"];
  let name = data["Crypto Rating (FCAS)"]["2. name"];
  let fcasRating = data["Crypto Rating (FCAS)"]["3. fcas rating"];
  let fcasScore = data["Crypto Rating (FCAS)"]["4. fcas score"];
  let developlerScore = data["Crypto Rating (FCAS)"]["5. developer score"];
  let marketMaturityScore =
    data["Crypto Rating (FCAS)"]["6. market maturity score"];
  let utilityScore = data["Crypto Rating (FCAS)"]["7. utility score"];
  let lastRefreshed = data["Crypto Rating (FCAS)"]["8. last refreshed"];
  let timezone = data["Crypto Rating (FCAS)"]["9. timezone"];
  console.log(symbol);
  console.log(name);
  console.log(fcasRating);
  console.log(fcasScore);
  console.log(developlerScore);
  console.log(marketMaturityScore);
  console.log(utilityScore);
  console.log(lastRefreshed);
  console.log(timezone);

  res.status(200).json({
    symbol,
    name,
    fcasRating,
    fcasScore,
    developlerScore,
    marketMaturityScore,
    utilityScore,
    lastRefreshed,
    timezone,
  });
};

const getExchangeRateBothCurrencyAndCrypto = async (req, res, next) => {
  let response;
  try {
    response = await axios.get(
      `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${encodeURIComponent(
        req.query.FromCurrency
      )}&to_currency=${encodeURIComponent(req.query.ToCurrency)}&apikey=${
        process.env.ALPHA_ADVANTAGE_API_KEY
      }`
    );
  } catch (error) {}

  let data;
  data = response.data;
  console.log(data);
  console.log(data["Realtime Currency Exchange Rate"]);

  let FromCurrencyCode =
    data["Realtime Currency Exchange Rate"]["1. From_Currency Code"];
  let FromCurrencyName =
    data["Realtime Currency Exchange Rate"]["2. From_Currency Name"];

  let ToCurrencyCode =
    data["Realtime Currency Exchange Rate"]["3. To_Currency Code"];
  let ToCurrencyName =
    data["Realtime Currency Exchange Rate"]["4. To_Currency Name"];
  let ExchangeRate =
    data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];

  let LastRefreshed =
    data["Realtime Currency Exchange Rate"]["6. Last Refreshed"];
  let TimeZone = data["Realtime Currency Exchange Rate"]["7. Time Zone"];
  let BidPrice = data["Realtime Currency Exchange Rate"]["8. Bid Price"];
  let AskPrice = data["Realtime Currency Exchange Rate"]["9. Ask Price"];
  console.log(FromCurrencyCode);
  console.log(FromCurrencyName);
  console.log(ToCurrencyCode);
  console.log(ToCurrencyName);
  console.log(ExchangeRate);
  console.log(LastRefreshed);
  console.log(TimeZone);
  console.log(BidPrice);
  console.log(AskPrice);

  res.json({
    FromCurrencyCode,
    FromCurrencyName,
    ToCurrencyCode,
    ToCurrencyName,
    ExchangeRate,
    LastRefreshed,
    TimeZone,
    BidPrice,
    AskPrice,
  });
};

// const getVideo = async (params) => {
//   let response;
//   let responseData;
//   try {
//     response = await axios.get("https://vimeo.com/439287536");
//     const valid = response.isObject();

//     console.log(response);
//     console.log(valid);
//   } catch (error) {}
// };
// getVideo();

exports.getExternalApi = getExternalApi;
exports.getValueBasedonCurrency = getValueBasedonCurrency;
exports.getHistoricalPrice = getHistoricalPrice;
exports.getHealthIndex = getHealthIndex;
exports.getExchangeRateBothCurrencyAndCrypto = getExchangeRateBothCurrencyAndCrypto;
