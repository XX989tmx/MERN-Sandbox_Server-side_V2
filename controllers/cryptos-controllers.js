const CryptoCurrency = require("../constructor/crypto-constructor");

const getCryptoIndex = async (req, res, next) => {
  let cryptoArray = [];

  const bitcoin = new CryptoCurrency(
    "Bitcoin",
    "Bitcoin",
    "BTC",
    "$10,518.90",
    "7,673.88 %",
    "1",
    "$194,566,365,921",
    "$24,032,755,526",
    "18,496,831 BTC",
    "18,496,831 BTC",
    "21,000,000 BTC",
    "$20,089.00 USD",
    "$65.53 USD",
    "$12,359.06 USD /$4,106.98 USD",
    "$12,359.06 USD /$8,975.53 USD",
    "$12,359.06 USD /$10,372.98 USD",
    "$12,067.08 USD /$10,372.98 USD",
    "$12,067.08 USD /$10,372.98 USD",
    "$10,988.30 USD /$10,380.26 USD",
    "$10,934.93 USD /$10,462.26 USD",
    "$-472.67 USD (-4.32%)",
    "$28,884,999,244 USD",
    "https://bitcoin.org/",
    "https://github.com/bitcoin/",
    "https://bitcoin.org/bitcoin.pdf",
    "https://s2.coinmarketcap.com/static/img/coins/32x32/1.png",
    "AA",
    "85.51",
    "892"
  );

  cryptoArray.push(bitcoin);
  // bitcoin.name = "Bitcoin";
  // bitcoin.price = "no data";
  // bitcoin.roi = "7,673.88 %";
  // bitcoin.marketRank = "no data";
  // bitcoin.marketCap = "no data";
  console.log(bitcoin);
  console.log(bitcoin.name);

  console.log(typeof bitcoin);
  console.log(cryptoArray[0].code);

  const ethereum = new CryptoCurrency(
    "Ethereum",
    "Ethereum",
    "ETH",
    "$343.44 USD",
    "> 9000%",
    "2",
    "$38,710,363,907 USD",
    "$13,475,871,809 USD",
    "112,713,810 ETH",
    "112,713,810 ETH",
    "No Data",
    "$1,432.88 USD",
    "$0.420897 USD",
    "$487.21 USD /$95.18 USD",
    "$487.21 USD /$219.47 USD",
    "$487.21 USD /$334.98 USD",
    "$487.21 USD /$334.98 USD",
    "$487.21 USD /$334.98 USD",
    "$346.60 USD /$336.86 USD",
    "$341.72 USD /$344.50 USD",
    "$2.78 USD (0.81%)",
    "$12,732,578,043 USD",
    "https://www.ethereum.org/",
    "https://github.com/ethereum",
    "https://github.com/ethereum/wiki/wiki/White-Paper",
    "https://s2.coinmarketcap.com/static/img/coins/32x32/1027.png",
    "A",
    "72.14",
    "972"
  );
  console.log(ethereum);
  cryptoArray.push(ethereum);
  console.log(cryptoArray);

  const tether = new CryptoCurrency(
    "Tether",
    "Tether",
    "USDT",
    "$1.00 USD",
    "0.09%",
    "3",
    "$15,224,942,508 USD",
    "$43,684,817,858 USD",
    "15,211,973,024 USD",
    "15,876,284,578 USD",
    "No Data",
    "$1.21 USD",
    "$0 USD",
    "$1.08　USD /$0.899490 USD",
    "$1.06 USD/$0.988427 USD",
    "$1.03 USD /$0.991814 USD",
    "$1.02　USD /$0.996732 USD",
    "$1.02 USD /$0.997990 USD",
    "$1.01 USD /$0.998589 USD",
    "$1.00 USD /$1.00 USD",
    "$-0.001953 USD",
    "$38,413,876,677 USD",
    "https://tether.to/",
    "no data",
    "https://tether.to/wp-content/uploads/2016/06/TetherWhitePaper.pdf",
    "https://s2.coinmarketcap.com/static/img/coins/32x32/825.png",
    "no data",
    "no data",
    "781"
  );

  cryptoArray.push(tether);

  const xrp = new CryptoCurrency(
    "XRP",
    "XRP",
    "XRP",
    "$0.231563USD",
    "3,842.28%",
    "4",
    "$10,442,891,423 USD",
    "$1,592,498,305 USD",
    "45,097,364,449 XRP",
    "99,990,878,704 XRP",
    "100,000,000,000 XRP",
    "$3.84 USD",
    "$0.002802 USD",
    "$0.343972　USD/$0.115093 USD",
    "$0.324403 USD /$0.174234 USD",
    "$0.324403 USD /$0.230076 USD",
    "$0.303214 USD /$0.230076 USD",
    "$0.303214 USD /$0.230076 USD",
    "$0.234743 USD /$0.230237 USD",
    "$0.231848 USD /$0.233417 USD",
    "$0.001569 USD (0.68%)",
    "$1,019,583,831 USD",
    "https://ripple.com/xrp/",
    "https://github.com/ripple",
    "https://ripple.com/files/ripple_consensus_whitepaper.pdf",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
    "BBB",
    "no data",
    "860"
  );

  cryptoArray.push(xrp);

  const bitcoinCash = new CryptoCurrency(
    "Bitcoin Cash",
    "Bitcoin-Cash",
    "BCH",
    "$214.96 USD",
    "-61.33%",
    "5",
    "$3,982,100,404USD",
    "$1,286,251,938 USD",
    "18,525,194 BCH",
    "18,525,194 BCH",
    "21,000,000 BCH",
    "$4,355.62 USD",
    "$75.03 USD",
    "$493.03 USD /$139.22 USD",
    "$334.78 USD /$210.48 USD",
    "$324.77 USD /$210.48 USD",
    "$295.45 USD /$210.48 USD",
    "$295.45 USD /$210.48 USD",
    "$220.09 USD /$211.99 USD",
    "$213.50 USD /$220.03 USD",
    "$6.54 USD (3.06%)",
    "$987,166,460 USD",
    "https://www.bitcoincash.org/",
    "https://github.com/bitcoincashorg/",
    "no data",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png",
    "BB",
    "no data",
    "826"
  );

  cryptoArray.push(bitcoinCash);

  const polkadot = new CryptoCurrency(
    "Polkadot",
    "Polkadot",
    "DOT",
    "$4.03 USD",
    "44.67%",
    "6",
    "$3,438,831,777 USD",
    "$612,677,813 USD",
    "852,647,705 DOT",
    "987,964,778 DOT",
    "no data",
    "$6.84 USD",
    "$2.69 USD",
    "$6.84 USD /$2.69 USD",
    "$6.84 USD /$2.69 USD",
    "$6.84 USD /$2.69 USD",
    "$6.84 USD /$3.91 USD",
    "$6.61 USD /$3.91 USD",
    "$4.21 USD /$3.92 USD",
    "$4.09 USD /$4.17 USD",
    "$0.089061 USD (2.18%)",
    "$673,117,344 USD",
    "https://polkadot.network/",
    "https://github.com/w3f",
    "no data",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png",
    "no data",
    "no data",
    "no data"
  );

  cryptoArray.push(polkadot);

  const binance = new CryptoCurrency(
    "Binance Coin",
    "Binance-Coin",
    "BNB",
    "$23.52 USD",
    ">9000%",
    "7",
    "$3,396,278,777 USD",
    "$456,093,374 USD",
    "144,406,560 BNB",
    "176,406,561 BNB",
    "176,406,561 BNB",
    "$39.57 USD",
    "$0.096109 USD",
    "$28.02 USD /$6.96 USD",
    "$28.02 USD /$15.02 USD",
    "$28.02 USD /$20.62 USD",
    "$28.02 USD /$21.92 USD",
    "$28.02 USD /$22.48 USD",
    "$24.52 USD /$22.85 USD",
    "$23.19 USD /$24.10 USD",
    "$0.912534 USD (3.94%)",
    "$340,023,558 USD",
    "https://www.binance.com/",
    "no data",
    "https://whitepaper.io/document/10/binance-whitepaper",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
    "BBB",
    "81.06",
    "798"
  );

  cryptoArray.push(binance);
  console.log(cryptoArray[cryptoArray.length - 1]);

  const chainlink = new CryptoCurrency(
    "Chainlink",
    "Chainlink",
    "LINK",
    "$10.34",
    "no data",
    "8",
    "$3,617,452,403 USD",
    "$1,676,590,990 USD",
    "350,000,000 LINK",
    "1,000,000,000 LINK",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://chain.link/",
    "https://github.com/smartcontractkit/chainlink",
    "https://link.smartcontract.com/whitepaper",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png",
    "BB",
    "74.82",
    "943"
  );
  cryptoArray.push(chainlink);

  const cryptoComCoin = new CryptoCurrency(
    "Crypto.com Coin",
    "crypto-com-coin",
    "CRO",
    "$0.154884",
    "no data",
    "9",
    "$3,141,239,940 USD",
    "$60,930,483 USD",
    "20,281,278,539 CRO",
    "100,000,000,000 CRO",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://www.crypto.com/en/chain",
    "no data",
    "https://www.crypto.com/images/chain_whitepaper.pdf",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/3635.png",
    "no data",
    "no data",
    "863"
  );
  cryptoArray.push(cryptoComCoin);

  const bitcoinSV = new CryptoCurrency(
    "Bitcoin SV",
    "bitcoin-sv",
    "BSV",
    "$164.39",
    "no data",
    "10",
    "$3,045,675,157 USD",
    "$645,618,679 USD",
    "18,527,033 BSV",
    "18,527,033 BSV",
    "21,000,000 BSV",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://bitcoinsv.com/",
    "https://github.com/bitcoin-sv/bitcoin-sv",
    "no data",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/3602.png",
    "no data",
    "no data",
    "no data"
  );
  cryptoArray.push(bitcoinSV);

  const carnano = new CryptoCurrency(
    "Cardano",
    "cardano",
    "ADA",
    "$0.097398",
    "no data",
    "11",
    "$3,030,296,130 USD",
    "$590,064,733 USD",
    "31,112,484,646 ADA",
    "45,000,000,000 ADA",
    "45,000,000,000 ADA",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://www.cardano.org/",
    "https://cardanoupdates.com/",
    "https://www.cardano.org/en/academic-papers/",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
    "BBB",
    "61.94",
    "903"
  );
  cryptoArray.push(carnano);

  const litecoin = new CryptoCurrency(
    "Litecoin",
    "litecoin",
    "LTC",
    "$46.18 USD",
    "no data",
    "12",
    "$3,027,175,243 USD",
    "$2,382,381,706 USD",
    "65,545,036 LTC",
    "65,545,036 LTC",
    "84,000,000 LTC",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://litecoin.org/",
    "https://github.com/litecoin-project/litecoin",
    "no data",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png",
    "BBB",
    "77.12",
    "721"
  );
  cryptoArray.push(litecoin);

  const usdcoin = new CryptoCurrency(
    "USD Coin",
    "usd-coin",
    "USDC",
    "$1.00 USD",
    "no data",
    "13",
    "$2,528,438,214 USD",
    "$391,975,621 USD",
    "2,527,493,774 USDC",
    "2,551,406,259 USDC",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://www.centre.io/usdc",
    "https://github.com/centrehq/centre-tokens",
    "https://www.centre.io/pdfs/centre-whitepaper.pdf",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
    "no data",
    "no data",
    "778"
  );
  cryptoArray.push(usdcoin);

  const eos = new CryptoCurrency(
    "EOS",
    "eos",
    "EOS",
    "$2.58 USD",
    "no data",
    "14",
    "$2,420,048,561 USD",
    "$1,972,246,468 USD",
    "936,398,779 EOS",
    "1,023,098,790 EOS",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://eos.io/",
    "https://github.com/eosio",
    "https://github.com/EOSIO/Documentation/blob/master/TechnicalWhitePaper.md",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/1765.png",
    "BBB",
    "69",
    "912"
  );
  cryptoArray.push(eos);

  const tron = new CryptoCurrency(
    "TRON",
    "tron",
    "TRX",
    "$0.027315 USD",
    "no data",
    "15",
    "$1,957,389,687 USD",
    "$1,722,972,986 USD",
    "71,659,657,369 TRX",
    "100,850,743,812 TRX",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://tron.network/",
    "https://github.com/tronprotocol",
    "https://developers.tron.network/docs",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png",
    "BBB",
    "no data",
    "902"
  );
  cryptoArray.push(tron);

  

  res.json({ cryptoArray: cryptoArray });
};

const getSpecificCurrencyInfoByName = async (req, res, next) => {
  //this is not currency.name, but currency.queryName.
  const queryName = req.params.queryName;

  let cryptoArray = [];

  const bitcoin = new CryptoCurrency(
    "Bitcoin",
    "Bitcoin",
    "BTC",
    "$10,518.90",
    "7,673.88 %",
    "1",
    "$194,566,365,921",
    "$24,032,755,526",
    "18,496,831 BTC",
    "18,496,831 BTC",
    "21,000,000 BTC",
    "$20,089.00 USD",
    "$65.53 USD",
    "$12,359.06 USD /$4,106.98 USD",
    "$12,359.06 USD /$8,975.53 USD",
    "$12,359.06 USD /$10,372.98 USD",
    "$12,067.08 USD /$10,372.98 USD",
    "$12,067.08 USD /$10,372.98 USD",
    "$10,988.30 USD /$10,380.26 USD",
    "$10,934.93 USD /$10,462.26 USD",
    "$-472.67 USD (-4.32%)",
    "$28,884,999,244 USD",
    "https://bitcoin.org/",
    "https://github.com/bitcoin/",
    "https://bitcoin.org/bitcoin.pdf",
    "https://s2.coinmarketcap.com/static/img/coins/32x32/1.png",
    "AA",
    "85.51",
    "892"
  );

  cryptoArray.push(bitcoin);
  // bitcoin.name = "Bitcoin";
  // bitcoin.price = "no data";
  // bitcoin.roi = "7,673.88 %";
  // bitcoin.marketRank = "no data";
  // bitcoin.marketCap = "no data";
  console.log(bitcoin);
  console.log(bitcoin.name);

  console.log(typeof bitcoin);
  console.log(cryptoArray[0].code);

  const ethereum = new CryptoCurrency(
    "Ethereum",
    "Ethereum",
    "ETH",
    "$343.44 USD",
    "> 9000%",
    "2",
    "$38,710,363,907 USD",
    "$13,475,871,809 USD",
    "112,713,810 ETH",
    "112,713,810 ETH",
    "No Data",
    "$1,432.88 USD",
    "$0.420897 USD",
    "$487.21 USD /$95.18 USD",
    "$487.21 USD /$219.47 USD",
    "$487.21 USD /$334.98 USD",
    "$487.21 USD /$334.98 USD",
    "$487.21 USD /$334.98 USD",
    "$346.60 USD /$336.86 USD",
    "$341.72 USD /$344.50 USD",
    "$2.78 USD (0.81%)",
    "$12,732,578,043 USD",
    "https://www.ethereum.org/",
    "https://github.com/ethereum",
    "https://github.com/ethereum/wiki/wiki/White-Paper",
    "https://s2.coinmarketcap.com/static/img/coins/32x32/1027.png",
    "A",
    "72.14",
    "972"
  );
  console.log(ethereum);
  cryptoArray.push(ethereum);
  console.log(cryptoArray);

  const tether = new CryptoCurrency(
    "Tether",
    "Tether",
    "USDT",
    "$1.00 USD",
    "0.09%",
    "3",
    "$15,224,942,508 USD",
    "$43,684,817,858 USD",
    "15,211,973,024 USD",
    "15,876,284,578 USD",
    "No Data",
    "$1.21 USD",
    "$0 USD",
    "$1.08　USD /$0.899490 USD",
    "$1.06 USD/$0.988427 USD",
    "$1.03 USD /$0.991814 USD",
    "$1.02　USD /$0.996732 USD",
    "$1.02 USD /$0.997990 USD",
    "$1.01 USD /$0.998589 USD",
    "$1.00 USD /$1.00 USD",
    "$-0.001953 USD",
    "$38,413,876,677 USD",
    "https://tether.to/",
    "no data",
    "https://tether.to/wp-content/uploads/2016/06/TetherWhitePaper.pdf",
    "https://s2.coinmarketcap.com/static/img/coins/32x32/825.png",
    "no data",
    "no data",
    "781"
  );

  cryptoArray.push(tether);

  const xrp = new CryptoCurrency(
    "XRP",
    "XRP",
    "XRP",
    "$0.231563USD",
    "3,842.28%",
    "4",
    "$10,442,891,423 USD",
    "$1,592,498,305 USD",
    "45,097,364,449 XRP",
    "99,990,878,704 XRP",
    "100,000,000,000 XRP",
    "$3.84 USD",
    "$0.002802 USD",
    "$0.343972　USD/$0.115093 USD",
    "$0.324403 USD /$0.174234 USD",
    "$0.324403 USD /$0.230076 USD",
    "$0.303214 USD /$0.230076 USD",
    "$0.303214 USD /$0.230076 USD",
    "$0.234743 USD /$0.230237 USD",
    "$0.231848 USD /$0.233417 USD",
    "$0.001569 USD (0.68%)",
    "$1,019,583,831 USD",
    "https://ripple.com/xrp/",
    "https://github.com/ripple",
    "https://ripple.com/files/ripple_consensus_whitepaper.pdf",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
    "BBB",
    "no data",
    "860"
  );

  cryptoArray.push(xrp);

  const bitcoinCash = new CryptoCurrency(
    "Bitcoin Cash",
    "Bitcoin-Cash",
    "BCH",
    "$214.96 USD",
    "-61.33%",
    "5",
    "$3,982,100,404USD",
    "$1,286,251,938 USD",
    "18,525,194 BCH",
    "18,525,194 BCH",
    "21,000,000 BCH",
    "$4,355.62 USD",
    "$75.03 USD",
    "$493.03 USD /$139.22 USD",
    "$334.78 USD /$210.48 USD",
    "$324.77 USD /$210.48 USD",
    "$295.45 USD /$210.48 USD",
    "$295.45 USD /$210.48 USD",
    "$220.09 USD /$211.99 USD",
    "$213.50 USD /$220.03 USD",
    "$6.54 USD (3.06%)",
    "$987,166,460 USD",
    "https://www.bitcoincash.org/",
    "https://github.com/bitcoincashorg/",
    "no data",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png",
    "BB",
    "no data",
    "826"
  );

  cryptoArray.push(bitcoinCash);

  const polkadot = new CryptoCurrency(
    "Polkadot",
    "Polkadot",
    "DOT",
    "$4.03 USD",
    "44.67%",
    "6",
    "$3,438,831,777 USD",
    "$612,677,813 USD",
    "852,647,705 DOT",
    "987,964,778 DOT",
    "no data",
    "$6.84 USD",
    "$2.69 USD",
    "$6.84 USD /$2.69 USD",
    "$6.84 USD /$2.69 USD",
    "$6.84 USD /$2.69 USD",
    "$6.84 USD /$3.91 USD",
    "$6.61 USD /$3.91 USD",
    "$4.21 USD /$3.92 USD",
    "$4.09 USD /$4.17 USD",
    "$0.089061 USD (2.18%)",
    "$673,117,344 USD",
    "https://polkadot.network/",
    "https://github.com/w3f",
    "no data",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png",
    "no data",
    "no data",
    "no data"
  );

  cryptoArray.push(polkadot);

  const binance = new CryptoCurrency(
    "Binance Coin",
    "Binance-Coin",
    "BNB",
    "$23.52 USD",
    ">9000%",
    "7",
    "$3,396,278,777 USD",
    "$456,093,374 USD",
    "144,406,560 BNB",
    "176,406,561 BNB",
    "176,406,561 BNB",
    "$39.57 USD",
    "$0.096109 USD",
    "$28.02 USD /$6.96 USD",
    "$28.02 USD /$15.02 USD",
    "$28.02 USD /$20.62 USD",
    "$28.02 USD /$21.92 USD",
    "$28.02 USD /$22.48 USD",
    "$24.52 USD /$22.85 USD",
    "$23.19 USD /$24.10 USD",
    "$0.912534 USD (3.94%)",
    "$340,023,558 USD",
    "https://www.binance.com/",
    "no data",
    "https://whitepaper.io/document/10/binance-whitepaper",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
    "BBB",
    "81.06",
    "798"
  );
  cryptoArray.push(binance);

  const chainlink = new CryptoCurrency(
    "Chainlink",
    "Chainlink",
    "LINK",
    "$10.34",
    "no data",
    "8",
    "$3,617,452,403 USD",
    "$1,676,590,990 USD",
    "350,000,000 LINK",
    "1,000,000,000 LINK",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://chain.link/",
    "https://github.com/smartcontractkit/chainlink",
    "https://link.smartcontract.com/whitepaper",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png",
    "BB",
    "74.82",
    "943"
  );
  cryptoArray.push(chainlink);

  const cryptoComCoin = new CryptoCurrency(
    "Crypto.com Coin",
    "crypto-com-coin",
    "CRO",
    "$0.154884",
    "no data",
    "9",
    "$3,141,239,940 USD",
    "$60,930,483 USD",
    "20,281,278,539 CRO",
    "100,000,000,000 CRO",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://www.crypto.com/en/chain",
    "no data",
    "https://www.crypto.com/images/chain_whitepaper.pdf",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/3635.png",
    "no data",
    "no data",
    "863"
  );
  cryptoArray.push(cryptoComCoin);

  const bitcoinSV = new CryptoCurrency(
    "Bitcoin SV",
    "bitcoin-sv",
    "BSV",
    "$164.39",
    "no data",
    "10",
    "$3,045,675,157 USD",
    "$645,618,679 USD",
    "18,527,033 BSV",
    "18,527,033 BSV",
    "21,000,000 BSV",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://bitcoinsv.com/",
    "https://github.com/bitcoin-sv/bitcoin-sv",
    "no data",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/3602.png",
    "no data",
    "no data",
    "no data"
  );
  cryptoArray.push(bitcoinSV);

  const carnano = new CryptoCurrency(
    "Cardano",
    "cardano",
    "ADA",
    "$0.097398",
    "no data",
    "11",
    "$3,030,296,130 USD",
    "$590,064,733 USD",
    "31,112,484,646 ADA",
    "45,000,000,000 ADA",
    "45,000,000,000 ADA",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://www.cardano.org/",
    "https://cardanoupdates.com/",
    "https://www.cardano.org/en/academic-papers/",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
    "BBB",
    "61.94",
    "903"
  );
  cryptoArray.push(carnano);

  const litecoin = new CryptoCurrency(
    "Litecoin",
    "litecoin",
    "LTC",
    "$46.18 USD",
    "no data",
    "12",
    "$3,027,175,243 USD",
    "$2,382,381,706 USD",
    "65,545,036 LTC",
    "65,545,036 LTC",
    "84,000,000 LTC",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://litecoin.org/",
    "https://github.com/litecoin-project/litecoin",
    "no data",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png",
    "BBB",
    "77.12",
    "721"
  );
  cryptoArray.push(litecoin);

  const usdcoin = new CryptoCurrency(
    "USD Coin",
    "usd-coin",
    "USDC",
    "$1.00 USD",
    "no data",
    "13",
    "$2,528,438,214 USD",
    "$391,975,621 USD",
    "2,527,493,774 USDC",
    "2,551,406,259 USDC",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://www.centre.io/usdc",
    "https://github.com/centrehq/centre-tokens",
    "https://www.centre.io/pdfs/centre-whitepaper.pdf",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
    "no data",
    "no data",
    "778"
  );
  cryptoArray.push(usdcoin);

  const eos = new CryptoCurrency(
    "EOS",
    "eos",
    "EOS",
    "$2.58 USD",
    "no data",
    "14",
    "$2,420,048,561 USD",
    "$1,972,246,468 USD",
    "936,398,779 EOS",
    "1,023,098,790 EOS",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://eos.io/",
    "https://github.com/eosio",
    "https://github.com/EOSIO/Documentation/blob/master/TechnicalWhitePaper.md",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/1765.png",
    "BBB",
    "69",
    "912"
  );
  cryptoArray.push(eos);

  const tron = new CryptoCurrency(
    "TRON",
    "tron",
    "TRX",
    "$0.027315 USD",
    "no data",
    "15",
    "$1,957,389,687 USD",
    "$1,722,972,986 USD",
    "71,659,657,369 TRX",
    "100,850,743,812 TRX",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://tron.network/",
    "https://github.com/tronprotocol",
    "https://developers.tron.network/docs",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png",
    "BBB",
    "no data",
    "902"
  );
  cryptoArray.push(tron);

  const matchedCurrency = cryptoArray.filter(function (v, i) {
    return v.queryName === queryName;
  });

  res.json({ matchedCurrency: matchedCurrency });
};

const getSpecificCurrencyRatingByName = async (req, res, next) => {
  //this is not currency.name, but currency.queryName.
  const queryName = req.params.queryName;

  let cryptoArray = [];

  const bitcoin = new CryptoCurrency(
    "Bitcoin",
    "Bitcoin",
    "BTC",
    "$10,518.90",
    "7,673.88 %",
    "1",
    "$194,566,365,921",
    "$24,032,755,526",
    "18,496,831 BTC",
    "18,496,831 BTC",
    "21,000,000 BTC",
    "$20,089.00 USD",
    "$65.53 USD",
    "$12,359.06 USD /$4,106.98 USD",
    "$12,359.06 USD /$8,975.53 USD",
    "$12,359.06 USD /$10,372.98 USD",
    "$12,067.08 USD /$10,372.98 USD",
    "$12,067.08 USD /$10,372.98 USD",
    "$10,988.30 USD /$10,380.26 USD",
    "$10,934.93 USD /$10,462.26 USD",
    "$-472.67 USD (-4.32%)",
    "$28,884,999,244 USD",
    "https://bitcoin.org/",
    "https://github.com/bitcoin/",
    "https://bitcoin.org/bitcoin.pdf",
    "https://s2.coinmarketcap.com/static/img/coins/32x32/1.png",
    "AA",
    "85.51",
    "892"
  );

  cryptoArray.push(bitcoin);
  // bitcoin.name = "Bitcoin";
  // bitcoin.price = "no data";
  // bitcoin.roi = "7,673.88 %";
  // bitcoin.marketRank = "no data";
  // bitcoin.marketCap = "no data";
  console.log(bitcoin);
  console.log(bitcoin.name);

  console.log(typeof bitcoin);
  console.log(cryptoArray[0].code);

  const ethereum = new CryptoCurrency(
    "Ethereum",
    "Ethereum",
    "ETH",
    "$343.44 USD",
    "> 9000%",
    "2",
    "$38,710,363,907 USD",
    "$13,475,871,809 USD",
    "112,713,810 ETH",
    "112,713,810 ETH",
    "No Data",
    "$1,432.88 USD",
    "$0.420897 USD",
    "$487.21 USD /$95.18 USD",
    "$487.21 USD /$219.47 USD",
    "$487.21 USD /$334.98 USD",
    "$487.21 USD /$334.98 USD",
    "$487.21 USD /$334.98 USD",
    "$346.60 USD /$336.86 USD",
    "$341.72 USD /$344.50 USD",
    "$2.78 USD (0.81%)",
    "$12,732,578,043 USD",
    "https://www.ethereum.org/",
    "https://github.com/ethereum",
    "https://github.com/ethereum/wiki/wiki/White-Paper",
    "https://s2.coinmarketcap.com/static/img/coins/32x32/1027.png",
    "A",
    "72.14",
    "972"
  );
  console.log(ethereum);
  cryptoArray.push(ethereum);
  console.log(cryptoArray);

  const tether = new CryptoCurrency(
    "Tether",
    "Tether",
    "USDT",
    "$1.00 USD",
    "0.09%",
    "3",
    "$15,224,942,508 USD",
    "$43,684,817,858 USD",
    "15,211,973,024 USD",
    "15,876,284,578 USD",
    "No Data",
    "$1.21 USD",
    "$0 USD",
    "$1.08　USD /$0.899490 USD",
    "$1.06 USD/$0.988427 USD",
    "$1.03 USD /$0.991814 USD",
    "$1.02　USD /$0.996732 USD",
    "$1.02 USD /$0.997990 USD",
    "$1.01 USD /$0.998589 USD",
    "$1.00 USD /$1.00 USD",
    "$-0.001953 USD",
    "$38,413,876,677 USD",
    "https://tether.to/",
    "no data",
    "https://tether.to/wp-content/uploads/2016/06/TetherWhitePaper.pdf",
    "https://s2.coinmarketcap.com/static/img/coins/32x32/825.png",
    "no data",
    "no data",
    "781"
  );

  cryptoArray.push(tether);

  const xrp = new CryptoCurrency(
    "XRP",
    "XRP",
    "XRP",
    "$0.231563USD",
    "3,842.28%",
    "4",
    "$10,442,891,423 USD",
    "$1,592,498,305 USD",
    "45,097,364,449 XRP",
    "99,990,878,704 XRP",
    "100,000,000,000 XRP",
    "$3.84 USD",
    "$0.002802 USD",
    "$0.343972　USD/$0.115093 USD",
    "$0.324403 USD /$0.174234 USD",
    "$0.324403 USD /$0.230076 USD",
    "$0.303214 USD /$0.230076 USD",
    "$0.303214 USD /$0.230076 USD",
    "$0.234743 USD /$0.230237 USD",
    "$0.231848 USD /$0.233417 USD",
    "$0.001569 USD (0.68%)",
    "$1,019,583,831 USD",
    "https://ripple.com/xrp/",
    "https://github.com/ripple",
    "https://ripple.com/files/ripple_consensus_whitepaper.pdf",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
    "BBB",
    "no data",
    "860"
  );

  cryptoArray.push(xrp);

  const bitcoinCash = new CryptoCurrency(
    "Bitcoin Cash",
    "Bitcoin-Cash",
    "BCH",
    "$214.96 USD",
    "-61.33%",
    "5",
    "$3,982,100,404USD",
    "$1,286,251,938 USD",
    "18,525,194 BCH",
    "18,525,194 BCH",
    "21,000,000 BCH",
    "$4,355.62 USD",
    "$75.03 USD",
    "$493.03 USD /$139.22 USD",
    "$334.78 USD /$210.48 USD",
    "$324.77 USD /$210.48 USD",
    "$295.45 USD /$210.48 USD",
    "$295.45 USD /$210.48 USD",
    "$220.09 USD /$211.99 USD",
    "$213.50 USD /$220.03 USD",
    "$6.54 USD (3.06%)",
    "$987,166,460 USD",
    "https://www.bitcoincash.org/",
    "https://github.com/bitcoincashorg/",
    "no data",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png",
    "BB",
    "no data",
    "826"
  );

  cryptoArray.push(bitcoinCash);

  const polkadot = new CryptoCurrency(
    "Polkadot",
    "Polkadot",
    "DOT",
    "$4.03 USD",
    "44.67%",
    "6",
    "$3,438,831,777 USD",
    "$612,677,813 USD",
    "852,647,705 DOT",
    "987,964,778 DOT",
    "no data",
    "$6.84 USD",
    "$2.69 USD",
    "$6.84 USD /$2.69 USD",
    "$6.84 USD /$2.69 USD",
    "$6.84 USD /$2.69 USD",
    "$6.84 USD /$3.91 USD",
    "$6.61 USD /$3.91 USD",
    "$4.21 USD /$3.92 USD",
    "$4.09 USD /$4.17 USD",
    "$0.089061 USD (2.18%)",
    "$673,117,344 USD",
    "https://polkadot.network/",
    "https://github.com/w3f",
    "no data",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png",
    "no data",
    "no data",
    "no data"
  );

  cryptoArray.push(polkadot);

  const binance = new CryptoCurrency(
    "Binance Coin",
    "Binance-Coin",
    "BNB",
    "$23.52 USD",
    ">9000%",
    "7",
    "$3,396,278,777 USD",
    "$456,093,374 USD",
    "144,406,560 BNB",
    "176,406,561 BNB",
    "176,406,561 BNB",
    "$39.57 USD",
    "$0.096109 USD",
    "$28.02 USD /$6.96 USD",
    "$28.02 USD /$15.02 USD",
    "$28.02 USD /$20.62 USD",
    "$28.02 USD /$21.92 USD",
    "$28.02 USD /$22.48 USD",
    "$24.52 USD /$22.85 USD",
    "$23.19 USD /$24.10 USD",
    "$0.912534 USD (3.94%)",
    "$340,023,558 USD",
    "https://www.binance.com/",
    "no data",
    "https://whitepaper.io/document/10/binance-whitepaper",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
    "BBB",
    "81.06",
    "798"
  );
  cryptoArray.push(binance);

  const chainlink = new CryptoCurrency(
    "Chainlink",
    "Chainlink",
    "LINK",
    "$10.34",
    "no data",
    "8",
    "$3,617,452,403 USD",
    "$1,676,590,990 USD",
    "350,000,000 LINK",
    "1,000,000,000 LINK",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://chain.link/",
    "https://github.com/smartcontractkit/chainlink",
    "https://link.smartcontract.com/whitepaper",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png",
    "BB",
    "74.82",
    "943"
  );
  cryptoArray.push(chainlink);

  const cryptoComCoin = new CryptoCurrency(
    "Crypto.com Coin",
    "crypto-com-coin",
    "CRO",
    "$0.154884",
    "no data",
    "9",
    "$3,141,239,940 USD",
    "$60,930,483 USD",
    "20,281,278,539 CRO",
    "100,000,000,000 CRO",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://www.crypto.com/en/chain",
    "no data",
    "https://www.crypto.com/images/chain_whitepaper.pdf",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/3635.png",
    "no data",
    "no data",
    "863"
  );
  cryptoArray.push(cryptoComCoin);

  const bitcoinSV = new CryptoCurrency(
    "Bitcoin SV",
    "bitcoin-sv",
    "BSV",
    "$164.39",
    "no data",
    "10",
    "$3,045,675,157 USD",
    "$645,618,679 USD",
    "18,527,033 BSV",
    "18,527,033 BSV",
    "21,000,000 BSV",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://bitcoinsv.com/",
    "https://github.com/bitcoin-sv/bitcoin-sv",
    "no data",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/3602.png",
    "no data",
    "no data",
    "no data"
  );
  cryptoArray.push(bitcoinSV);

  const carnano = new CryptoCurrency(
    "Cardano",
    "cardano",
    "ADA",
    "$0.097398",
    "no data",
    "11",
    "$3,030,296,130 USD",
    "$590,064,733 USD",
    "31,112,484,646 ADA",
    "45,000,000,000 ADA",
    "45,000,000,000 ADA",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://www.cardano.org/",
    "https://cardanoupdates.com/",
    "https://www.cardano.org/en/academic-papers/",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
    "BBB",
    "61.94",
    "903"
  );
  cryptoArray.push(carnano);

  const litecoin = new CryptoCurrency(
    "Litecoin",
    "litecoin",
    "LTC",
    "$46.18 USD",
    "no data",
    "12",
    "$3,027,175,243 USD",
    "$2,382,381,706 USD",
    "65,545,036 LTC",
    "65,545,036 LTC",
    "84,000,000 LTC",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://litecoin.org/",
    "https://github.com/litecoin-project/litecoin",
    "no data",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/2.png",
    "BBB",
    "77.12",
    "721"
  );
  cryptoArray.push(litecoin);

  const usdcoin = new CryptoCurrency(
    "USD Coin",
    "usd-coin",
    "USDC",
    "$1.00 USD",
    "no data",
    "13",
    "$2,528,438,214 USD",
    "$391,975,621 USD",
    "2,527,493,774 USDC",
    "2,551,406,259 USDC",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://www.centre.io/usdc",
    "https://github.com/centrehq/centre-tokens",
    "https://www.centre.io/pdfs/centre-whitepaper.pdf",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
    "no data",
    "no data",
    "778"
  );
  cryptoArray.push(usdcoin);

  const eos = new CryptoCurrency(
    "EOS",
    "eos",
    "EOS",
    "$2.58 USD",
    "no data",
    "14",
    "$2,420,048,561 USD",
    "$1,972,246,468 USD",
    "936,398,779 EOS",
    "1,023,098,790 EOS",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://eos.io/",
    "https://github.com/eosio",
    "https://github.com/EOSIO/Documentation/blob/master/TechnicalWhitePaper.md",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/1765.png",
    "BBB",
    "69",
    "912"
  );
  cryptoArray.push(eos);

  const tron = new CryptoCurrency(
    "TRON",
    "tron",
    "TRX",
    "$0.027315 USD",
    "no data",
    "15",
    "$1,957,389,687 USD",
    "$1,722,972,986 USD",
    "71,659,657,369 TRX",
    "100,850,743,812 TRX",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "no data",
    "https://tron.network/",
    "https://github.com/tronprotocol",
    "https://developers.tron.network/docs",
    "https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png",
    "BBB",
    "no data",
    "902"
  );
  cryptoArray.push(tron);

  const matchedCurrency = cryptoArray.filter(function (v, i) {
    return v.queryName === queryName;
  });

  res.json({ matchedCurrency: matchedCurrency });
};

exports.getCryptoIndex = getCryptoIndex;

exports.getSpecificCurrencyInfoByName = getSpecificCurrencyInfoByName;
exports.getSpecificCurrencyRatingByName = getSpecificCurrencyRatingByName;
