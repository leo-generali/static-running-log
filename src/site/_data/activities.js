const Activity = require("../../models/activity");
const activities = require("../../../db/activities.json");
const laps = require("../../../db/laps.json");

module.exports = activities.map(activity => {
  const activityId = activity.id;

  const activityLaps = laps.filter(lap => {
    if (lap.activity) {
      if (lap.activity.id === activityId) return lap;
    }
  });

  const args = {
    ...activity,
    laps:
      activityLaps === undefined
        ? []
        : activityLaps.sort((lapA, lapB) => lapA.split - lapB.split)
  };

  return new Activity(args);
});
