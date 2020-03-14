const years = require("./activityYears");

const navigation = years.map(year => {
  return {
    path: year === "/" ? "/" : `/${year}`,
    name: year === "/" ? "Home" : `${year}`
  };
});

module.exports = [...navigation, { path: "/about", name: "about" }];
