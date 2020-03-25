const strava = require("strava-v3");
const faunadb = require("faunadb");
const { config, oauth } = require("./utils/auth");

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNDA_DB_KEY
});

const resultMessage = activitiesAdded => {
  if (activitiesAdded.length === 0)
    return { message: `No new activities were added to Fauna` };

  return {
    message: `The following activities were added to Faunda: ${activitiesAdded.join(
      ", "
    )}`
  };
};

exports.handler = async (event, context) => {
  // Get the grant code
  const { code } = JSON.parse(event.body);

  try {
    // Get the auth token using the grant code
    const authorizationToken = await oauth.authorizationCode.getToken({
      code: code,
      client_id: config.clientId,
      client_secret: config.clientSecret
    });

    // Extract user's access token from authorization token
    const accessToken = authorizationToken.access_token;
    console.log({ accessToken });

    // Get the last 10 activities from Strava
    const latestTenActivitiesFromStrava = await strava.athlete.listActivities({
      page: 1,
      per_page: 10,
      access_token: accessToken
    });

    const activitiesAdded = [];

    // Loop through each activity. If it exists in our DB, don't do anything,
    // if it doesn't... save it!
    latestTenActivitiesFromStrava.forEach(async stravaActivity => {
      const activityId = stravaActivity.id;
      console.log(`Checking to see if ${activityId} is already in Fauna`);

      // Check to see if the activity exists in our Database:
      const activityExistsInDB = await client.query(
        q.Exists(q.Match(q.Index("activity_by_id"), activityId))
      );

      // If the activity isn't in our databse, add it!
      if (!activityExistsInDB) {
        activitiesAdded.push(activityId);
        await client.query(
          q.Create(q.Collection("activities"), { data: stravaActivity })
        );
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(resultMessage(activitiesAdded))
    };
  } catch (e) {
    console.log(`Error:`, e.message);
    console.log(e);

    return {
      statusCode: e.statusCode || 500,
      body: JSON.stringify({
        error: e.message
      })
    };
  }
};
