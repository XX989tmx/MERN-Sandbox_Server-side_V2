const referenceSitesHandler = (
  referenceSiteName1,
  referenceSiteName2,
  referenceSiteName3,
  referenceSiteLink1,
  referenceSiteLink2,
  referenceSiteLink3
) => {
  let referenceSiteArray = [];
  if (referenceSiteName1 && referenceSiteLink1) {
    const site1 = {
      name: referenceSiteName1,
      link: referenceSiteLink1,
    };
    referenceSiteArray.push(site1);
  }
  if (referenceSiteName2 && referenceSiteLink2) {
    const site2 = {
      name: referenceSiteName2,
      link: referenceSiteLink2,
    };
    referenceSiteArray.push(site2);
  }
  if (referenceSiteName3 && referenceSiteLink3) {
    const site3 = {
      name: referenceSiteName3,
      link: referenceSiteLink3,
    };
    referenceSiteArray.push(site3);
  }
  return referenceSiteArray;
};

module.exports = referenceSitesHandler;