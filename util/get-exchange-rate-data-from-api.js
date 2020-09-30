const { default: Axios } = require("axios");

function getExchangeRateDataFromAPI(Fromcurrency, Tocurrency) {
    let exchangeResult;
  Axios.get(
    `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${encodeURIComponent(
      Fromcurrency
    )}&to_currency=${encodeURIComponent(Tocurrency)}&apikey=${
      process.env.ALPHA_ADVANTAGE_API_KEY
    }`
  )
    .then((response) => {
      let data;
      data = response.data;

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

      exchangeResult = {
        FromCurrencyCode: FromCurrencyCode,
        FromCurrencyName: FromCurrencyName,
        ToCurrencyCode: ToCurrencyCode,
        ToCurrencyName: ToCurrencyName,
        ExchangeRate: ExchangeRate,
        LastRefreshed: LastRefreshed,
        TimeZone: TimeZone,
        BidPrice: BidPrice,
        AskPrice: AskPrice,
      };
      console.log(exchangeResult);

      return exchangeResult;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(function (exchangeResult) {
      return exchangeResult;
    });
}

module.exports = getExchangeRateDataFromAPI;
