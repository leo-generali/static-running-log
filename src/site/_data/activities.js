const Activity = require("../../models/activity");
const activities = require("../../../db/activities.json");

module.exports = activities.map(activity => new Activity(activity));
