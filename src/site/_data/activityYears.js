const activities = require("../../../db/activities.json");
const moment = require("moment");

const years = activities.map(activity => moment(activity.date).format("YYYY"));

module.exports = ["/", ...new Set(years)];
