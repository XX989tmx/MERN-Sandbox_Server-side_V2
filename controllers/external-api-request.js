const express = require("express");

const axios = require("axios");
const bodyParser = require("body-parser");
const util = require("util");
const mongoose = require("mongoose");

const getCryptoTicker = require('../util/crypto-ticker');

const Crypto = require('../models/crypto');

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


  res.json({
    exchange_rate: `${JPY},${USD},${AUD},${BRL},${CAD},${CHF},${CLP},${CNY},${DKK},${EUR},${GBP},${HKD},${INR},${ISK},${KRW},${NZD},${PLN},${RUB},${SEK},${SGD},${THB},${TRY},${TWD}`,
    lastValueOfEveryCurrency: lastValueOfEveryCurrency,
    currencySymbolOfEveryCurrency: currencySymbolOfEveryCurrency,
  });
};

const getValueBasedonCurrency = async(req, res, next) => {
  const { currency, value } = req.body;
  console.log(currency);

    let valueBasedOnCurrency;

    try {
      valueBasedOnCurrency = await getCryptoTicker(currency, value);
      console.log(valueBasedOnCurrency);
    } catch (error) {
      
    };

    res.json({ value_based_on_your_currency: valueBasedOnCurrency })
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
