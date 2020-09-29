const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var coinmaketcapCryptoSchema = new mongoose.Schema({
  name: { type: String },
  queryName: { type: String },
  code: { type: String },
  price: {
    usd: { type: String },
    btc: { type: String },
    eth: { type: String },
  },
  roi: { type: String },
  marketRank: { type: String },
  marketCap: {
    usd: { type: String },
    btc: { type: String },
    eth: { type: String },
    bnb: { type: String },
  },
  a24hourVolume: {
    usd: { type: String },
    btc: { type: String },
    eth: { type: String },
    bnb: { type: String },
  },
  circulatingSupply: { type: String },
  totalSupply: { type: String },
  maxSupply: { type: String },
  allTimeHigh: { type: String },
  allTimeLow: { type: String },
  a52weekHigh: { type: String },
  a52weekLow: { type: String },
  a90dayHigh: { type: String },
  a90dayLow: { type: String },
  a30dayHigh: { type: String },
  a30dayLow: { type: String },
  a7dayHigh: { type: String },
  a7dayLow: { type: String },
  a24hourHigh: { type: String },
  a24hourLow: { type: String },
  yesterdaysHigh: { type: String },
  yesterdaysLow: { type: String },
  yesterdaysOpen: { type: String },
  yesterdaysClose: { type: String },
  yesterdaysChange: { type: String },
  yesterdaysVolume: { type: String },
  website: [{ type: String }],
  announcement: [{ type: String }],
  explorer: [{ type: String }],
  message_board: [{ type: String }],
  chat: [{ type: String }],
  sourceCode: [{ type: String }],
  technicalDocumentation: [{ type: String }],
  tags: [{ type: String }],
  icon: { type: String },
  report: {
    heading: { type: String },
    report_list: [{ type: String }],
    paragraph: { type: String },
    score: { type: String },
    updated_at: { type: String },
    market_opportunity: { type: String },
    underlying_technology: { type: String },
    ecosystem_structure: { type: String },
    core_team: { type: String },
    token_economics: { type: String },
    token_performance: { type: String },
    roadmap_progress: { type: String },
  },
  tokenInsightRating: {
    score: { type: String },
    score_string: { type: String },
    industry: { type: String },
    rating_description: { type: String },
  },
  dynamicPerformanceScore: { type: String },
  fcasRatingInitial: { type: String },
  fcasScore: { type: String },
  article: {
    heading1: { type: String },
    paragraph1: [{ type: String }],
    heading2: { type: String },
    paragraph2: [{ type: String }],
    heading3: { type: String },
    paragraph3: [{ type: String }],
    heading4: { type: String },
    paragraph4: [{ type: String }],
    heading5: { type: String },
    paragraph5: [{ type: String }],
    heading6: { type: String },
    paragraph6: [{ type: String }],
    heading7: { type: String },
    paragraph7: [{ type: String }],
    heading8: { type: String },
    paragraph8: [{ type: String }],
    heading9: { type: String },
    paragraph9: [{ type: String }],
    heading10: { type: String },
    paragraph10: [{ type: String }],
  },
});

//Export the model
const CoinMarketCapCrypto = mongoose.model(
  "CoinMarketCapCrypto",
  coinmaketcapCryptoSchema
);

var array = [
  {
    name: "Bitcoin",
    queryName: "Bitcoin",
    code: "BTC",
    price: "10,518.9",
    roi: "7,673.88",
    marketRank: "1",
    marketCap: "194,566,365,921",
    a24hourVolume: "24,032,755,526",
    circulatingSupply: "18,496,831",
    totalSupply: "18,496,831",
    maxSupply: "21,000,000",
    allTimeHigh: "20,089.0",
    allTimeLow: "65.53",
    a52weekHigh: "12,359.06",
    a52weekLow: "4,106.98",
    a90dayHigh: "12,359.06",
    a90dayLow: "8,975.53",
    a30dayHigh: "12,359.06",
    a30dayLow: "10,372.98",
    a7dayHigh: "12,067.08",
    a7dayLow: "10,372.98",
    a24hourHigh: "12,067.08",
    a24hourLow: "10,372.98",
    yesterdaysHigh: "10,988.30",
    yesterdaysLow: "10,380.26",
    yesterdaysOpen: "10,934.93",
    yesterdaysClose: "10,462.26",
    yesterdaysChange: "-472.67",
    yesterdaysVolume: "28,884,999,244",
    website: "https://bitcoin.org/",
    sourceCode: "https://github.com/bitcoin/",
    technicalDocumentation: "https://bitcoin.org/bitcoin.pdf",
    icon: "https://s2.coinmarketcap.com/static/img/coins/32x32/1.png",
    tokenInsightRating: "AA",
    dynamicPerformanceScore: "85.51",
    fcasScore: "892",
    article: {
      heading1: String(`What Is Bitcoin (BTC)?`),
      paragraph1: String(`Bitcoin is a decentralized cryptocurrency originally described in a 2008 whitepaper by a person, or group of people, using the alias Satoshi Nakamoto. It was launched soon after, in January 2009.

Bitcoin is a peer-to-peer online currency, meaning that all transactions happen directly between equal, independent network participants, without the need for any intermediary to permit or facilitate them. Bitcoin was created, according to Nakamoto’s own words, to allow “online payments to be sent directly from one party to another without going through a financial institution.”

Some concepts for a similar type of a decentralized electronic currency precede BTC, but Bitcoin holds the distinction of being the first-ever cryptocurrency to come into actual use.`),
      heading2: String(`Who Are The Founders Of Bitcoin?
`),
      paragraph2: String(`Bitcoin’s original inventor is known under a pseudonym, Satoshi Nakamoto. As of 2020, the true identity of the person — or organization — that is behind the alias remains unknown.

On October 31, 2008, Nakamoto published Bitcoin’s whitepaper, which described in detail how a peer-to-peer, online currency could be implemented. They proposed to use a decentralized ledger of transactions packaged in batches (called “blocks”) and secured by cryptographic algorithms — the whole system would later be dubbed “blockchain.”

Just two months later, on January 3, 2009, Nakamoto mined the first block on the Bitcoin network, known as the genesis block, thus launching the world’s first cryptocurrency.

However, while Nakamoto was the original inventor of Bitcoin, as well as the author of its very first implementation, over the years a large number of people have contributed to improving the cryptocurrency’s software by patching vulnerabilities and adding new features.

Bitcoin’s source code repository on GitHub lists more than 750 contributors, with some of the key ones being Wladimir J. van der Laan, Marco Falke, Pieter Wuille, Gavin Andresen, Jonas Schnelli and others.

`),
      heading3: String(`What Makes Bitcoin Unique?`),
      paragraph3: String(`Bitcoin’s most unique advantage comes from the fact that it was the very first cryptocurrency to appear on the market.

It has managed to create a global community and give birth to an entirely new industry of millions of enthusiasts who create, invest in, trade and use Bitcoin and other cryptocurrencies in their everyday lives. The emergence of the first cryptocurrency has created a conceptual and technological basis that subsequently inspired the development of thousands of competing projects.

The entire cryptocurrency industry — now worth more than $300 billion — is based on the idea realized by Bitcoin: money that can be sent and received by anyone, anywhere in the world without reliance on trusted intermediaries, such as banks and financial services companies.

Thanks to its pioneering nature, BTC remains at the top of this energetic market after over a decade of existence. Even after Bitcoin has lost its undisputed dominance, it remains the largest cryptocurrency, with a market capitalization that fluctuated between $100-$200 billion in 2020, owing in large part to the ubiquitousness of platforms that provide use-cases for BTC: wallets, exchanges, payment services, online games and more.

Related Pages:
Looking for market and blockchain data for BTC? Visit our block explorer.

Want to buy Bitcoin? Use CoinMarketCap’s guide.

`),
      heading4: String(`How Much Bitcoin Is In Circulation?
`),
      paragraph4: String(`Bitcoin’s total supply is limited by its software and will never exceed 21,000,000 coins. New coins are created during the process known as “mining”: as transactions are relayed across the network, they get picked up by miners and packaged into blocks, which are in turn protected by complex cryptographic calculations.

As compensation for spending their computational resources, the miners receive rewards for every block that they successfully add to the blockchain. At the moment of Bitcoin’s launch, the reward was 50 bitcoins per block: this number gets halved with every 210,000 new blocks mined — which takes the network roughly four years. As of 2020, the block reward has been halved three times and comprises 6.25 bitcoins.

Bitcoin has not been premined, meaning that no coins have been mined and/or distributed between the founders before it became available to the public. However, during the first few years of BTC’s existence, the competition between miners was relatively low, allowing the earliest network participants to accumulate significant amounts of coins via regular mining: Satoshi Nakamoto alone is believed to own over a million Bitcoin.`),
      heading5: String(`How Is the Bitcoin Network Secured?`),
      paragraph5: String(`Bitcoin is secured with the SHA-256 algorithm, which belongs to the SHA-2 family of hashing algorithms, which is also used by its fork Bitcoin Cash (BCH), as well as several other cryptocurrencies.

`),
      heading6: String(`Where Can You Buy [Bitcoin] ([BTC])?`),
      paragraph6: String(`Bitcoin is, in many regards, almost synonymous with cryptocurrency, which means that you can buy or sell it on virtually every crypto exchange — both for fiat money and other cryptocurrencies. Some of the main markets where BTC trading is available are:

Binance
Coinbase Pro
OKEx
Kraken
Huobi Global
Bitfinex
If you are new to crypto, use CoinMarketCap’s own easy guide to buying Bitcoin.

`),
      heading7: String(""),
      paragraph7: String(""),
      heading8: String(""),
      paragraph8: String(""),
      heading9: String(""),
      paragraph9: String(""),
      heading10: String(""),
      paragraph10: String(""),
    },
  },
];

CoinMarketCapCrypto.create(array).then((docs) => {
  console.log(docs);
});

// Connect MongoDB at default port 27017.
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-7slh6.mongodb.net/test?retryWrites=true&w=majority`,
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
