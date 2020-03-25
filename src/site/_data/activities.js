const Activity = require("../../models/Activity");
const laps = require("../../../db/laps.json");

const getActivities = async () => {
  return await require("../../../db/activities.json");
};

module.exports = async () => {
  const activities = await getActivities();

  return activities.map(activity => {
    // Get the ID of the current activity
    const activityId = activity.id;

    // Get any information from CMS about this activity
    // If there isn't any data from CMS set it equal to an empty
    // oject
    const cmsInfo =
      require("../../../db/cms.json").find(
        cmsActivity => cmsActivity.activity_id === activityId
      ) || {};

    // Get associated laps for an activity
    const activityLaps = laps
      .filter(lap => {
        if (lap.activity) {
          if (lap.activity.id === activityId) return lap;
        }
      })
      .sort((lapA, lapB) => lapA.split - lapB.split);

    // Create activity argument object
    const activityArguments = {
      ...activity,
      cms: {
        ...cmsInfo
      },
      laps: [...activityLaps]
    };

    // Create new activity
    return new Activity(activityArguments);
  });
};
