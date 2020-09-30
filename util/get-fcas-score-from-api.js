const { default: Axios } = require("axios");

 async function getFcasScoreFromAPI(cryptoSymbol) {
  let response;
  let fcasRatingData;
  Axios.get(
    `https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=${encodeURIComponent(
      cryptoSymbol
    )}&apikey=${process.env.ALPHA_ADVANTAGE_API_KEY}`
  )
    .then((response) => {
      const data = response.data;

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
      fcasRatingData = {
        symbol: symbol,
        name: name,
        fcasRating: fcasRating,
        fcasScore: fcasScore,
        developlerScore: developlerScore,
        marketMaturityScore: marketMaturityScore,
        utilityScore: utilityScore,
        lastRefreshed: lastRefreshed,
        timezone: timezone,
      };
      console.log(fcasRatingData);

      return fcasRatingData;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(function (fcasRatingData) {
      return fcasRatingData;
    });
}
// console.log(getFcasScoreFromAPI());
module.exports = getFcasScoreFromAPI;