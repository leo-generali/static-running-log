const {
  byWeek,
  byDay,
  firstOfWeek,
  endOfWeek,
  byYear
} = require("./src/scripts/site/date");
const svg = require("./src/scripts/site/svg");

module.exports = config => {
  // Filters
  config.addFilter("byWeek", byWeek);
  config.addFilter("byDay", byDay);
  config.addFilter("firstOfWeek", firstOfWeek);
  config.addFilter("endOfWeek", endOfWeek);
  config.addFilter("activitiesByYear", byYear);
  config.addFilter("svg", svg);

  config.addFilter("log", content => {
    console.log(content);
  });

  config.addWatchTarget("./_site/assets/*/**");
  config.addWatchTarget("./src/scripts/site/*/**");

  return {
    dir: {
      input: "src/site",
      output: "_site"
    }
  };
};
