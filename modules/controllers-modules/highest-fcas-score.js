const mongoose = require("mongoose");
const coinmarketcapCrypto = require("../../models/coinmarketcap-crypto");

// find highest fcas score and find a doc with the highest fcas score
(async function HighestFcasScore(params) {
  const fcasScoreArray = await (async function IFFY(params) {
    let cryptos;
    try {
      cryptos = await coinmarketcapCrypto.find({}); // CoinbaeCrypto Mongo Docs
    } catch (error) {
      console.log(error);
    }
    

    let fcasScoreArray = [];

    for (let i = 0; i < cryptos.length; i++) {
      const element = cryptos[i];
      const fcasScore = Number(element.fcasScore);
      console.log(fcasScore);
      fcasScoreArray.push(fcasScore);
    }
    

    return fcasScoreArray;
  })();

  //   const sum = fcasScoreArray.reduce((p, c, i) => {
  //     return p + c;
  //   }, 0);
  //   const average = sum / fcasScoreArray.length;
  console.log(fcasScoreArray);

  let highestFcas;

  try {
   highestFcas = Math.max(...fcasScoreArray);
  } catch (error) {}

  console.log(highestFcas);

  let cryptoWithHighestFcasScore;
  try {
   cryptoWithHighestFcasScore = await coinmarketcapCrypto.find({
      fcasScore: String(highestFcas),
    });
  } catch (error) {}

  console.log(cryptoWithHighestFcasScore[0]);
  console.log(
    `currently ${cryptoWithHighestFcasScore[0].name} is highest scored crypto currency through fcas standard. its fcas score is ${cryptoWithHighestFcasScore[0].fcasScore}`
  );
})();

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