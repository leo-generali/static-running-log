const { byWeek, byDay, byMonth, byYear } = require("./src/scripts/site/date");
const svg = require("./src/scripts/site/svg");

module.exports = config => {
  // Filters
  config.addFilter("byWeek", byWeek);
  config.addFilter("byDay", byDay);
  config.addFilter("activitiesByMonth", byMonth);
  config.addFilter("activitiesByYear", byYear);
  config.addFilter("svg", svg);
  config.addFilter("split", (string, separator) => string.split(separator));

  config.addFilter("log", content => {
    console.log(content);
  });

  return {
    dir: {
      input: "src/site",
      output: "_site"
    }
  };
};
