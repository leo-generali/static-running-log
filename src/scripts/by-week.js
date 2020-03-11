const moment = require("moment");
const _ = require("lodash");

module.exports = activities => {
  const groups = _.groupBy(activities, data => {
    const date = moment(data.date);
    return date.format("YYYY-W");
  });

  return Object.values(groups);
};
