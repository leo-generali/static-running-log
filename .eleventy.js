const moment = require("moment");
const { byWeek, firstOfWeek, endOfWeek } = require("./src/scripts/site/date");

module.exports = config => {
  config.addFilter("byWeek", byWeek);
  config.addFilter("firstOfWeek", firstOfWeek);
  config.addFilter("endOfWeek", endOfWeek);

  config.addFilter("log", node => {
    console.log(node);
  });

  config.addWatchTarget("./_site/assets/*/**");

  return {
    dir: {
      input: "src/site",
      output: "_site"
    }
  };
};
