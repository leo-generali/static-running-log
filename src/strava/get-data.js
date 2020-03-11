const strava = require("strava-v3");
const authorizeStrava = require("strava-v3-cli-authenticator");
const env = require("dotenv").config();
const db = require("diskdb");

const {
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  STRAVA_ATHLETE_ID
} = process.env;

const STRAVA_CONFIG = {
  clientId: STRAVA_CLIENT_ID,
  clientSecret: STRAVA_CLIENT_SECRET,
  scope: "read,activity:read",
  httpPort: 8888
};

const saveDataToLocalDB = () => {
  db.connect("db", ["activities"]);

  authorizeStrava(STRAVA_CONFIG, async (error, token) => {
    const data = await strava.athlete.listActivities({
      access_token: token
    });

    data.forEach(activity => {
      const check = db.activities.find({ id: activity.id });
      // If the activity doesn't already exist in the DB, save it!
      if (check.length === 0) {
        db.activities.save(activity);
      }
    });
  });
};

saveDataToLocalDB();
