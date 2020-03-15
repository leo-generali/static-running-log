const years = require("./activityYears");

const yearsNav = years.map(year => {
  return {
    path: year === "/" ? "/" : `/${year}/`,
    name: year === "/" ? "Home" : `${year}`
  };
});

const otherLinksNav = [{ path: "/about/", name: "About" }];

module.exports = [...yearsNav, ...otherLinksNav];
