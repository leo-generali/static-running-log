const {
  byWeek,
  firstOfWeek,
  endOfWeek,
  byYear
} = require("./src/scripts/site/date");

module.exports = config => {
  config.addFilter("byWeek", byWeek);
  config.addFilter("firstOfWeek", firstOfWeek);
  config.addFilter("endOfWeek", endOfWeek);
  config.addFilter("activitiesByYear", byYear);

  config.addFilter("log", content => {
    console.log(content);
  });

  config.addWatchTarget("./_site/assets/*/**");

  return {
    dir: {
      input: "src/site",
      output: "_site"
    }
  };
};
