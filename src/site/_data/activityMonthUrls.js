const activities = require("../../../db/activities.json");
const moment = require("moment");

const months = activities.map(activity =>
  moment(activity.start_date_local).format("Y/M")
);

module.exports = [...new Set(months)];
