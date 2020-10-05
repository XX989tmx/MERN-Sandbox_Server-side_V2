const mongoose = require("mongoose");
const coinmarketcapCrypto = require("../../models/coinmarketcap-crypto");

(async function (params) {
    const fcasScoreArray = await (async function IFFY(params) {
      let cryptos = await coinmarketcapCrypto.find({}); // CoinbaeCrypto Mongo Docs
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
      const docWithSuperbRating = await coinmarketcapCrypto.find({ fcasScore: SfcasSocre });
      SuperbRatedCryptoArray.push(docWithSuperbRating.pop());
    }
    console.log('S cryptos');
    console.log(SuperbRatedCryptoArray);

    //contains only Attractive rated crypto docs
    let AttractiveRatedCryptoArray = [];
    for (let i = 0; i < Attractive.length; i++) {
      const AfcasSocre = Attractive[i];
      const docWithAttractiveRating = await coinmarketcapCrypto.find({
        fcasScore: String(AfcasSocre),
      });
      AttractiveRatedCryptoArray.push(docWithAttractiveRating.pop());
    }
    console.log('A cryptos');
    console.log(AttractiveRatedCryptoArray);

    let BasicRatedCryptoArray = [];
    for (let i = 0; i < Basic.length; i++) {
      const BfcasSocre = Basic[i];
      const docWithBasicRating = await coinmarketcapCrypto.find({
        fcasScore: String(BfcasSocre),
      });
      BasicRatedCryptoArray.push(docWithBasicRating);
    }

    let CautionRatedCryptoArray = [];
    for (let i = 0; i < Caution.length; i++) {
      const CfcasSocre = Caution[i];
      const docWithCautionRating = await coinmarketcapCrypto.find({
        fcasScore: String(CfcasSocre),
      });
      CautionRatedCryptoArray.push(docWithCautionRating);
    }

    let FragileRatedCryptoArray = [];
    for (let i = 0; i < Fragile.length; i++) {
      const FfcasSocre = Fragile[i];
      const docWithFragileRating = await coinmarketcapCrypto.find({
        fcasScore: String(FfcasSocre),
      });
      FragileRatedCryptoArray.push(docWithFragileRating);
    }
})()




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