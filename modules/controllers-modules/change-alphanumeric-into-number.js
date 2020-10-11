function changeAlphaNumericIntoNumber(AlphaNumeric) {
  const usableAsNumberString = String(AlphaNumeric).split(",").join("");
  return Number(usableAsNumberString);
}

module.exports = changeAlphaNumericIntoNumber;