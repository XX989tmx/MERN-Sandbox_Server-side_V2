class CryptoCurrency {
  constructor(object) {
    (this.name = object.name),
      (this.queryName = object.queryName),
      (this.code = object.code),
      (this.price_usd = object.price.usd),
      (this.price_btc = object.price.btc),
      (this.price_eth = object.price.eth),
      (this.roi = object.roi),
      (this.marketRank = object.marketRank),
      (this.marketCap_usd = object.marketCap.usd),
      (this.marketCap_btc = object.marketCap.btc),
      (this.marketCap_eth = object.marketCap.eth),
      (this.marketCap_bnb = object.marketCap.bnb),
      (this.a24hourVolume_usd = object.a24hourVolume.usd),
      (this.a24hourVolume_self_code = object.a24hourVolume.self_code),
      (this.a24hourVolume_btc = object.a24hourVolume.btc),
      (this.a24hourVolume_eth = object.a24hourVolume.eth),
      (this.a24hourVolume_bnb = object.a24hourVolume.bnb),
      (this.circulatingSupply = object.circulatingSupply),
      (this.totalSupply = object.totalSupply),
      (this.maxSupply = object.maxSupply),
      (this.allTimeHigh = object.allTimeHigh),
      (this.allTimeLow = object.allTimeLow),
      (this.a52weekHigh = object.a52weekHigh),
      (this.a52weekLow = object.a52weekLow),
      (this.a90dayHigh = object.a90dayHigh),
      (this.a90dayLow = object.a90dayLow),
      (this.a30dayHigh = object.a30dayHigh),
      (this.a30dayLow = object.a30dayLow),
      (this.a7dayHigh = object.a7dayHigh),
      (this.a7dayLow = object.a7dayLow),
      (this.a24hourHigh = object.a24hourHigh),
      (this.a24hourLow = object.a24hourLow),
      (this.yesterdaysHigh = object.yesterdaysHigh),
      (this.yesterdaysLow = object.yesterdaysLow),
      (this.yesterdaysOpen = object.yesterdaysOpen),
      (this.yesterdaysClose = object.yesterdaysClose),
      (this.yesterdaysChange = object.yesterdaysChange),
      (this.yesterdaysVolume = object.yesterdaysVolume),
      (this.website = object.website),
      (this.announcement = object.announcement),
      (this.explorer = object.explorer),
      (this.message_board = object.message_board),
      (this.chat = object.chat),
      (this.sourceCode = object.sourceCode),
      (this.technicalDocumentation = object.technicalDocumentation),
      (this.tags = object.tags),
      (this.icon = object.icon),
      (this.report_heading = object.report.heading),
      (this.report_report_list = object.report.report_list),
      (this.report_paragraph = object.report.paragraph),
      (this.report_score = object.report.score),
      (this.report_updated_at = object.report.updated_at),
      (this.report_market_opportunity = object.report.market_opportunity),
      (this.report_underlying_technology = object.report.underlying_technology),
      (this.report_ecosystem_structure = object.report.ecosystem_structure),
      (this.report_core_team = object.report.core_team),
      (this.report_token_economics = object.report.token_economics),
      (this.report_token_performance = object.report.token_performance),
      (this.report_roadmap_progress = object.report.roadmap_progress),
      (this.tokenInsightRating_score = object.tokenInsightRating.score),
      (this.tokenInsightRating_score_string =
        object.tokenInsightRating.score_string),
      (this.tokenInsightRating_industry = object.tokenInsightRating.industry),
      (this.tokenInsightRating_rating_description =
        object.tokenInsightRating.rating_description),
      (this.dynamicPerformanceScore = object.dynamicPerformanceScore),
      (this.fcasRatingInitial = object.fcasRatingInitial),
      (this.fcasScore = object.fcasScore),
      (this.article_heading1 = object.article.heading1);
    this.article_paragraph1 = object.article.paragraph1;
    this.article_heading2 = object.article.heading2;
    this.article_paragraph2 = object.article.paragraph2;
    this.article_heading3 = object.article.heading3;
    this.article_paragraph3 = object.article.paragraph3;
    this.article_heading4 = object.article.heading4;
    this.article_paragraph4 = object.article.paragraph4;
    this.article_heading5 = object.article.heading5;
    this.article_paragraph5 = object.article.paragraph5;
    this.article_heading6 = object.article.heading6;
    this.article_paragraph6 = object.article.paragraph6;
    this.article_heading7 = object.article.heading7;
    this.article_paragraph7 = object.article.paragraph7;
    this.article_heading8 = object.article.heading8;
    this.article_paragraph8 = object.article.paragraph8;
    this.article_heading9 = object.article.heading9;
    this.article_paragraph9 = object.article.paragraph9;
    this.article_heading10 = object.article.heading10;
    this.article_paragraph10 = object.article.paragraph10;
  }

  getTotalSupply () {
    return this.totalSupply;
  }

  getWebsites () {
    return this.website
  }
  // let cryptoArray = [];

  // const bitcoin = new CryptoCurrency(
  //   "Bitcoin",
  //   "BTC",
  //   "$10,518.90",
  //   "7,673.88 %",
  //   "1",
  //   "$194,566,365,921",
  //   "$24,032,755,526",
  //   "18,496,831 BTC",
  //   "18,496,831 BTC",
  //   "21,000,000 BTC",
  //   "$20,089.00 USD",
  //   "$65.53 USD",
  //   "$12,359.06 USD /$4,106.98 USD",
  //   "$12,359.06 USD /$8,975.53 USD",
  //   "$12,359.06 USD /$10,372.98 USD",
  //   "$12,067.08 USD /$10,372.98 USD",
  //   "$12,067.08 USD /$10,372.98 USD",
  //   "$10,988.30 USD /$10,380.26 USD",
  //   "$10,934.93 USD /$10,462.26 USD",
  //   "$-472.67 USD (-4.32%)",
  //   "$28,884,999,244 USD",
  //   "https=//bitcoin.org/",
  //   "https=//github.com/bitcoin/",
  //   "https=//bitcoin.org/bitcoin.pdf",
  //   "https=//test-images-b.s3.amazonaws.com/08053423-e53a-4c9a-8186-dbe6bb4bca93.jpeg",
  //   "AA",
  //   "85.51",
  //   "892"
  // );

  // cryptoArray.push(bitcoin);
  // // bitcoin.name = "Bitcoin";
  // // bitcoin.price = "no data";
  // // bitcoin.roi = "7,673.88 %";
  // // bitcoin.marketRank = "no data";
  // // bitcoin.marketCap = "no data";
  // console.log(bitcoin);
  // console.log(bitcoin.name);

  // console.log(typeof bitcoin);
  // console.log(cryptoArray[0].code);

  // const ethereum = new CryptoCurrency(
  //   "Ethereum",
  //   "ETH",
  //   "$343.44 USD",
  //   "> 9000%",
  //   "2",
  //   "$38,710,363,907 USD",
  //   "$13,475,871,809 USD",
  //   "112,713,810 ETH",
  //   "112,713,810 ETH",
  //   "No Data",
  //   "$1,432.88 USD",
  //   "$0.420897 USD",
  //   "$487.21 USD /$95.18 USD",
  //   "$487.21 USD /$219.47 USD",
  //   "$487.21 USD /$334.98 USD",
  //   "$487.21 USD /$334.98 USD",
  //   "$487.21 USD /$334.98 USD",
  //   "$346.60 USD /$336.86 USD",
  //   "$341.72 USD /$344.50 USD",
  //   "$2.78 USD (0.81%)",
  //   "$12,732,578,043 USD",
  //   "https=//www.ethereum.org/",
  //   "https=//github.com/ethereum",
  //   "https=//github.com/ethereum/wiki/wiki/White-Paper",
  //   "https=//test-images-b.s3.amazonaws.com/08053423-e53a-4c9a-8186-dbe6bb4bca93.jpeg",
  //   "A",
  //   "72.14",
  //   "972"
  // );
  // console.log(ethereum);
  // cryptoArray.push(ethereum);
  // console.log(cryptoArray);

  // const tether = new CryptoCurrency(
  //   "Tether",
  //   "USDT",
  //   "$1.00 USD",
  //   "0.09%",
  //   "3",
  //   "$15,224,942,508 USD",
  //   "$43,684,817,858 USD",
  //   "15,211,973,024 USD",
  //   "15,876,284,578 USD",
  //   "No Data",
  //   "$1.21 USD",
  //   "$0 USD",
  //   "$1.08　USD /$0.899490 USD",
  //   "$1.06 USD/$0.988427 USD",
  //   "$1.03 USD /$0.991814 USD",
  //   "$1.02　USD /$0.996732 USD",
  //   "$1.02 USD /$0.997990 USD",
  //   "$1.01 USD /$0.998589 USD",
  //   "$1.00 USD /$1.00 USD",
  //   "$-0.001953 USD",
  //   "$38,413,876,677 USD",
  //   "https=//tether.to/",
  //   "no data",
  //   "https=//tether.to/wp-content/uploads/2016/06/TetherWhitePaper.pdf",
  //   "https=//test-images-b.s3.amazonaws.com/08053423-e53a-4c9a-8186-dbe6bb4bca93.jpeg",
  //   "no data",
  //   "no data",
  //   "781"
  // );

  // cryptoArray.push(tether);

  // const xrp = new CryptoCurrency(
  //   "XRP",
  //   "XRP",
  //   "$0.231563USD",
  //   "3,842.28%",
  //   "4",
  //   "$10,442,891,423 USD",
  //   "$1,592,498,305 USD",
  //   "45,097,364,449 XRP",
  //   "99,990,878,704 XRP",
  //   "100,000,000,000 XRP",
  //   "$3.84 USD",
  //   "$0.002802 USD",
  //   "$0.343972　USD/$0.115093 USD",
  //   "$0.324403 USD /$0.174234 USD",
  //   "$0.324403 USD /$0.230076 USD",
  //   "$0.303214 USD /$0.230076 USD",
  //   "$0.303214 USD /$0.230076 USD",
  //   "$0.234743 USD /$0.230237 USD",
  //   "$0.231848 USD /$0.233417 USD",
  //   "$0.001569 USD (0.68%)",
  //   "$1,019,583,831 USD",
  //   "https=//ripple.com/xrp/",
  //   "https=//github.com/ripple",
  //   "https=//ripple.com/files/ripple_consensus_whitepaper.pdf",
  //   "https=//s2.coinmarketcap.com/static/img/coins/64x64/52.png",
  //   "BBB",
  //   "no data",
  //   "860"
  // );

  // cryptoArray.push(xrp);

  // const bitcoinCash = new CryptoCurrency(
  //   "Bitcoin Cash",
  //   "BCH",
  //   "$214.96 USD",
  //   "-61.33%",
  //   "5",
  //   "$3,982,100,404USD",
  //   "$1,286,251,938 USD",
  //   "18,525,194 BCH",
  //   "18,525,194 BCH",
  //   "21,000,000 BCH",
  //   "$4,355.62 USD",
  //   "$75.03 USD",
  //   "$493.03 USD /$139.22 USD",
  //   "$334.78 USD /$210.48 USD",
  //   "$324.77 USD /$210.48 USD",
  //   "$295.45 USD /$210.48 USD",
  //   "$295.45 USD /$210.48 USD",
  //   "$220.09 USD /$211.99 USD",
  //   "$213.50 USD /$220.03 USD",
  //   "$6.54 USD (3.06%)",
  //   "$987,166,460 USD",
  //   "https=//www.bitcoincash.org/",
  //   "https=//github.com/bitcoincashorg/",
  //   "no data",
  //   "https=//s2.coinmarketcap.com/static/img/coins/64x64/1831.png",
  //   "BB",
  //   "no data",
  //   "826"
  // );

  // cryptoArray.push(bitcoinCash);

  // const polkadot = new CryptoCurrency(
  //   "Polkadot",
  //   "DOT",
  //   "$4.03 USD",
  //   "44.67%",
  //   "6",
  //   "$3,438,831,777 USD",
  //   "$612,677,813 USD",
  //   "852,647,705 DOT",
  //   "987,964,778 DOT",
  //   "no data",
  //   "$6.84 USD",
  //   "$2.69 USD",
  //   "$6.84 USD /$2.69 USD",
  //   "$6.84 USD /$2.69 USD",
  //   "$6.84 USD /$2.69 USD",
  //   "$6.84 USD /$3.91 USD",
  //   "$6.61 USD /$3.91 USD",
  //   "$4.21 USD /$3.92 USD",
  //   "$4.09 USD /$4.17 USD",
  //   "$0.089061 USD (2.18%)",
  //   "$673,117,344 USD",
  //   "https=//polkadot.network/",
  //   "https=//github.com/w3f",
  //   "no data",
  //   "https=//s2.coinmarketcap.com/static/img/coins/64x64/6636.png",
  //   "no data",
  //   "no data",
  //   "no data"
  // );

  // cryptoArray.push(polkadot);

  // const binance = new CryptoCurrency(
  //   "Binance Coin",
  //   "BNB",
  //   "$23.52 USD",
  //   ">9000%",
  //   "7",
  //   "$3,396,278,777 USD",
  //   "$456,093,374 USD",
  //   "144,406,560 BNB",
  //   "176,406,561 BNB",
  //   "176,406,561 BNB",
  //   "$39.57 USD",
  //   "$0.096109 USD",
  //   "$28.02 USD /$6.96 USD",
  //   "$28.02 USD /$15.02 USD",
  //   "$28.02 USD /$20.62 USD",
  //   "$28.02 USD /$21.92 USD",
  //   "$28.02 USD /$22.48 USD",
  //   "$24.52 USD /$22.85 USD",
  //   "$23.19 USD /$24.10 USD",
  //   "$0.912534 USD (3.94%)",
  //   "$340,023,558 USD",
  //   "https=//www.binance.com/",
  //   "no data",
  //   "https=//whitepaper.io/document/10/binance-whitepaper",
  //   "https=//s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
  //   "BBB",
  //   "81.06",
  //   "798"
  // );

  // cryptoArray.push(binance);
  // console.log(cryptoArray[cryptoArray.length - 1]);
}


const obj = {
    price: { usd: '358.79', btc: '0.03327610', eth: '' },
    marketCap: { usd: '40,499,412,753', btc: '3,754,185', eth: '', bnb: '' },
    a24hourVolume: {
      usd: '13,804,428,060',
      self_code: '38,451,081',
      btc: '1,279,633',
      eth: '',
      bnb: ''
    },
    report: {
      report_list: [Array],
      heading: 'Ethereum Report Highlights',
      paragraph: "Ethereum is fundamentally stronger than it's ever been. Despite all of the criticism it continues to be the number one project by development activity, with a massive developer community. The project is in a good position to not only maintain its spot as the number one platform for smart contracts, but grow its dominance in the coming quarter.",
      score: 'B+',
      updated_at: 'Feb 28, 2020',
      market_opportunity: '9.0',
      underlying_technology: '7.5',
      ecosystem_structure: '9.5',
      core_team: '8.0',
      token_economics: '8.0',
      token_performance: '6.5',
      roadmap_progress: '6.5'
    },
    tokenInsightRating: {
      score: 'A',
      score_string: 'Stable Outlook',
      industry: 'Smart Contract Platform',
      rating_description: 'TokenInsight ratings follow a specialized rating system (where AAA is the highest rating) to represent the quality and risk of Cryptocurrency projects based on Team, Project, and Ecosystem metrics.'
    },
    article: {
      paragraph1: [Array],
      paragraph2: [Array],
      paragraph3: [Array],
      paragraph4: [Array],
      paragraph5: [Array],
      paragraph6: [Array],
      paragraph7: [],
      paragraph8: [],
      paragraph9: [],
      paragraph10: [],
      heading1: 'What Is Ethereum (ETH)?',
      heading2: 'Who Are the Founders of Ethereum?',
      heading3: 'What Makes Ethereum Unique?',
      heading4: 'How Many Ethereum (ETH) Coins Are There In Circulation?',
      heading5: 'How Is the Ethereum Network Secured?',
      heading6: 'Where Can You Buy Ethereum (ETH)?',
      heading7: '',
      heading8: '',
      heading9: '',
      heading10: ''
    },
    website: [ 'https://www.ethereum.org/' ],
    announcement: [ 'https://bitcointalk.org/index.php?topic=428589.0' ],
    explorer: [
      'https://blockchain.coinmarketcap.com/chain/ethereum',
      'https://etherscan.io/',
      'https://ethplorer.io/',
      'https://blockchair.com/ethereum',
      'https://eth.tokenview.com/en/blocklist'
    ],
    message_board: [ 'https://forum.ethereum.org/' ],
    chat: [ 'https://gitter.im/orgs/ethereum/rooms' ],
    sourceCode: [ 'https://github.com/ethereum' ],
    technicalDocumentation: [ 'https://github.com/ethereum/wiki/wiki/White-Paper' ],
    tags: [ 'Coin', 'Mineable', 'PoW', 'Smart Contracts', 'Binance Chain' ],
    _id: "5f7445ead172f6199951e318",
    name: 'Ethereum',
    queryName: 'Ethereum',
    code: 'ETH',
    roi: '9000',
    marketRank: '2',
    circulatingSupply: '112,801,157',
    totalSupply: '112,801,157',
    maxSupply: '',
    allTimeHigh: '1,432.88',
    allTimeLow: '0.420897',
    a52weekHigh: '487.21',
    a52weekLow: '95.18',
    a90dayHigh: '487.21',
    a90dayLow: '352.15',
    a30dayHigh: '487.21',
    a30dayLow: '352.15',
    a7dayHigh: '366.43',
    a7dayLow: '352.15',
    a24hourHigh: '359.04',
    a24hourLow: '352.15',
    yesterdaysHigh: '366.89',
    yesterdaysLow: '354.83',
    yesterdaysOpen: '357.31',
    yesterdaysClose: '354.95',
    yesterdaysChange: '-2.36',
    yesterdaysVolume: '12,102,509,266',
    icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    dynamicPerformanceScore: '71.54',
    fcasRatingInitial: 'S',
    fcasScore: '971',
    __v: 0
  };

    console.log(new CryptoCurrency(obj).getTotalSupply()); 
    console.log(new CryptoCurrency(obj).getWebsites());  

module.exports = CryptoCurrency;
