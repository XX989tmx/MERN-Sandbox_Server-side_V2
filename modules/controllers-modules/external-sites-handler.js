const externalSitesHandler = (
  externalSitesName1,
  externalSitesName2,
  externalSitesName3,
  externalSitesName4,
  externalSitesName5,
  externalSitesLink1,
  externalSitesLink2,
  externalSitesLink3,
  externalSitesLink4,
  externalSitesLink5
) => {
  let externalSitesArray = [];
  if (externalSitesName1 && externalSitesLink1) {
    const external1 = {
      name: externalSitesName1,
      link: externalSitesLink1,
    };
    externalSitesArray.push(external1);
  }
  if (externalSitesName2 && externalSitesLink2) {
    const external2 = {
      name: externalSitesName2,
      link: externalSitesLink2,
    };
    externalSitesArray.push(external2);
  }
  if (externalSitesName3 && externalSitesLink3) {
    const external3 = {
      name: externalSitesName3,
      link: externalSitesLink3,
    };
    externalSitesArray.push(external3);
  }
  if (externalSitesName4 && externalSitesLink4) {
    const external4 = {
      name: externalSitesName4,
      link: externalSitesLink4,
    };
    externalSitesArray.push(external4);
  }
  if (externalSitesName5 && externalSitesLink5) {
    const external5 = {
      name: externalSitesName5,
      link: externalSitesLink5,
    };
    externalSitesArray.push(external5);
  }
  return externalSitesArray;
};

module.exports = externalSitesHandler;