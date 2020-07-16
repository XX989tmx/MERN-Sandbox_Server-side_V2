const axios = require("axios");

async function getCryptoTicker(currency, value) {
  const response = await axios.get(
    `https://blockchain.info/tobtc?currency=${encodeURIComponent(
      currency
    )}&value=${encodeURIComponent(value)}`
  );

  const data = response.data;


  return data;

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
};

module.exports = getCryptoTicker;

axios.get()