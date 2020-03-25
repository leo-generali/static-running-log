const strava = require("strava-v3");
const faunadb = require("faunadb");
const { config, oauth } = require("./utils/auth");

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNDA_DB_KEY
});

exports.handler = async (event, context) => {
  console.log("Getting all activities");

  const { data: activityRefs } = await client.query(
    q.Paginate(q.Match(q.Index("all_activities")))
  );

  const getAllActivityRefs = activityRefs.map(ref => q.Get(ref));

  const allActivities = await client.query(getAllActivityRefs);

  const activities = allActivities.map(({ data }) => data);

  return {
    statusCode: 200,
    body: JSON.stringify(activities)
  };
};
