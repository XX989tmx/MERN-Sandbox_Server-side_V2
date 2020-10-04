const { default: Axios } = require("axios");
const mongoose = require("mongoose");
const coinmarketcapCrypto = require("../../models/coinmarketcap-crypto");
const FcasRatingAndScore = require("../../models/FcasRatingAndScore");

async function crypto(params) {
  let cryptos;
  try {
    cryptos = await coinmarketcapCrypto.find({});
  } catch (error) {}

  let response;
  let data;
  let symbol;
  let name;
  let fcasRating;
  let fcasScore;
  let developlerScore;
  let marketMaturityScore;
  let utilityScore;
  let lastRefreshed;
  let timezone;
  let fcasArray = [];
  for (let index = 0; index < cryptos.length; index++) {
    const element = cryptos[index];
    const code = element.code;
    response = await Axios.get(
      `https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=${code}&apikey=${process.env.ALPHA_ADVANTAGE_API_KEY}`
    );
    data = response.data;
    console.log(data["Crypto Rating (FCAS)"]);
    symbol = data["Crypto Rating (FCAS)"]["1. symbol"];
    name = data["Crypto Rating (FCAS)"]["2. name"];
    fcasRating = data["Crypto Rating (FCAS)"]["3. fcas rating"];
    fcasScore = data["Crypto Rating (FCAS)"]["4. fcas score"];
    developlerScore = data["Crypto Rating (FCAS)"]["5. developer score"];
    marketMaturityScore =
      data["Crypto Rating (FCAS)"]["6. market maturity score"];
    utilityScore = data["Crypto Rating (FCAS)"]["7. utility score"];
    lastRefreshed = data["Crypto Rating (FCAS)"]["8. last refreshed"];
    timezone = data["Crypto Rating (FCAS)"]["9. timezone"];

    const newFcas = new FcasRatingAndScore({
      symbol: String(symbol),
      name: String(name),
      fcasRating: String(fcasRating),
      fcasScore: String(fcasScore),
      developlerScore: String(developlerScore),
      marketMaturityScore: String(marketMaturityScore),
      utilityScore: String(utilityScore),
      lastRefreshed: new Date(lastRefreshed).toISOString(),
      timezone: String(timezone),
    });
    newFcas.save();

    // fcasArray.push({
    //   data,
    //   symbol,
    //   name,
    //   fcasRating,
    //   fcasScore,
    //   developlerScore,
    //   marketMaturityScore,
    //   utilityScore,
    //   lastRefreshed,
    //   timezone,
    // });

    const updatedCrypto = await coinmarketcapCrypto.findOneAndUpdate(
      { code: code },
      { fcasScore: fcasScore }
    );
    updatedCrypto.save();
  }

  console.log(response);
  console.log(response.data);

  //   for (let index = 0; index < cryptos.length; index++) {
  //     const element = cryptos[index];
  //     element.fcasScore = fcasArray[index].fcasScore;
  //     element.save();
  //   }

  return cryptos;
}
crypto();

// Connect MongoDB at default port 27017.
mongoose.connect(
  `mongodb+srv://adminx:adminx@cluster0-7slh6.mongodb.net/mern?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);
