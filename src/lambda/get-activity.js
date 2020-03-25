const strava = require("strava-v3");
const faunadb = require("faunadb");

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNDA_DB_KEY
});

exports.handler = async (event, context) => {
  const id = event.queryStringParameters.id;
  console.log({ id });

  const activity = await client.query(
    q.Get(q.Match(q.Index("activity_by_id"), parseInt(id, 10)))
  );

  const data = activity.data;

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
