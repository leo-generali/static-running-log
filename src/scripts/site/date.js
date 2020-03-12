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

const byYear = (activities, year) => {
  if (year === "/") return activities;
  return activities.filter(activity => {
    const date = moment(activity.date).format("YYYY");
    return date === year;
  });
};

module.exports = { byWeek, firstOfWeek, endOfWeek, byYear };
