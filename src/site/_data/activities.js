const env = require("dotenv").config();
const faunadb = require("faunadb");
const Activity = require("../../models/activity");
const laps = require("../../../db/laps.json");

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNDA_DB_KEY
});

const getActivitiesFromFauna = async () => {
  const { data: activityRefs } = await client.query(
    q.Paginate(q.Match(q.Index("all_activities")))
  );

  const getAllActivityRefs = await activityRefs.map(ref => q.Get(ref));

  const allActivities = await client.query(getAllActivityRefs);

  return allActivities.map(({ data }) => data);
};

const getActivities = async () => {
  if (process.env.NODE_ENV === "development") {
    console.log("Getting activities from local DB cache");
  } else {
    console.log("Getting activities from online data store");
  }

  return process.env.NODE_ENV === "development"
    ? await require("../../../db/activities.json")
    : await getActivitiesFromFauna();
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
