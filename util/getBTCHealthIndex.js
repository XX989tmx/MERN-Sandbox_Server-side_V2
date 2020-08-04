const axios = require("axios");

async function getBTCIndex(params) {
    let response;
    let data;
    
      response = await axios.get(
        `https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol=BTC&apikey=${process.env.ALPHA_ADVANTAGE_API_KEY}`
      );
    

    console.log(response);
    console.log(response.data);

    data = response.data;

    
    var fcasRating = data["Crypto Rating (FCAS)"]["3. fcas rating"];
    console.log(fcasRating);

    return fcasRating;
}

module.exports = getBTCIndex;