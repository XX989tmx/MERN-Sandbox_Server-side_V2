const mongoose = require("mongoose");
const coinmarketcapCrypto = require("../../models/coinmarketcap-crypto");

(async function (params) {
  let top5fcasScoreCrypto;
  try {
    top5fcasScoreCrypto = await coinmarketcapCrypto
      .find({})
      .sort({ fcasScore: -1 })
      .limit(5);
  } catch (error) {}
  console.log(top5fcasScoreCrypto);
  console.log(top5fcasScoreCrypto.length);
  for (let index = 0; index < top5fcasScoreCrypto.length; index++) {
      const element = top5fcasScoreCrypto[index];
      console.log(`${index+1}rank : ${element.name}: fcasScore: ${element.fcasScore}: price: ${element.price.usd} USD`);
  }
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
