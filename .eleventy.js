const moment = require("moment");

module.exports = config => {
  config.addFilter("byWeek", require("./src/scripts/by-week"));
  config.addFilter("log", node => {
    console.log(node);
  });
  config.addFilter("firstOfWeek", activity => {
    return moment(activity.date)
      .startOf("isoWeek")
      .format("MMMM D");
  });
  config.addFilter("endOfWeek", activity => {
    return moment(activity.date)
      .endOf("isoWeek")
      .format("MMMM D");
  });

  return {
    dir: {
      input: "src/site",
      output: "_site"
    }
  };
};
