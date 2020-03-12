const moment = require("moment");
const _ = require("lodash");

const byWeek = activities => {
  const groups = _.groupBy(activities, data => {
    const date = moment(data.date);
    return date.format("YYYY-W");
  });

  return Object.values(groups);
};

const firstOfWeek = activity =>
  moment(activity.date)
    .startOf("isoWeek")
    .format("MMMM D");

const endOfWeek = activity =>
  moment(activity.date)
    .endOf("isoWeek")
    .format("MMMM D");

module.exports = { byWeek, firstOfWeek, endOfWeek };
