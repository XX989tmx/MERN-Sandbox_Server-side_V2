const express = require("express");

const axios = require("axios");
const bodyParser = require("body-parser");

const getCryptoTicker = require('../util/crypto-ticker');

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

  // AUD
  

  const last_JPY = data.JPY.last;
  const buy_JPY = data.JPY.buy;
  const sell_JPY = data.JPY.sell;
  const symbol_JPY = data.JPY.symbol;
  console.log(last_JPY);
  console.log(buy_JPY);
  console.log(sell_JPY);
  console.log(symbol_JPY);
  const JPY = `current exchange rate is  ${symbol_JPY}${last_JPY} yen based on JPY`;

  // let USD;
  // try {
  //   USD =  await getCryptoTicker();
  // } catch (error) {

  // }

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

  res.json({
    exchange_rate: `${JPY},${USD}`,
    
  });
};

const getValueBasedonCurrency = async(req, res, next) => {
  const { currency, value } = req.body;

    let valueBasedOnCurrency;

    try {
      valueBasedOnCurrency = await getCryptoTicker(currency, value);
      console.log(valueBasedOnCurrency);
    } catch (error) {
      
    };

    res.json({ value_based_on_your_currency: valueBasedOnCurrency })
};

exports.getExternalApi = getExternalApi;
exports.getValueBasedonCurrency = getValueBasedonCurrency;
