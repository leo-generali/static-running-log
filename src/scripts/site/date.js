const moment = require("moment");
const _ = require("lodash");
const ActivityGroup = require("../../models/ActivityGroup");
const Week = require("../../models/Week");

const byWeek = activities => {
  const groups = _.groupBy(activities, data => {
    const date = moment(data.date);
    return date.format("YYYY-W");
  });

  return Object.values(groups).map(week => new Week(week));
};

const byDay = activities => {
  const groups = _.groupBy(activities, data => {
    const date = moment(data.date);
    return date.format("E");
  });

  return groups;
};

const byMonth = (activities, slug) => {
  const activitiesInMonth = activities.filter(activity => {
    const date = moment(activity.date).format("YYYY/M");
    return date === slug;
  });

  return new ActivityGroup(activitiesInMonth);
};

const byYear = (activities, year) => {
  if (year === "/") return new ActivityGroup(activities);

  const activitiesInYear = activities.filter(activity => {
    const date = moment(activity.date).format("YYYY");
    return date === year;
  });

  return new ActivityGroup(activitiesInYear);
};

module.exports = { byWeek, byDay, byMonth, byYear };
