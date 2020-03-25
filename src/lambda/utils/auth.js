const oauth2 = require("simple-oauth2");
const env = require("dotenv").config();

const {
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  STRAVA_ATHLETE_ID
} = process.env;
const SITE_URL = process.env.URL || "http://localhost:1234";
const REDIRECT_URL = `${SITE_URL}/cms`;

const config = {
  /* values set in terminal session or in netlify environment variables */
  clientId: STRAVA_CLIENT_ID,
  clientSecret: STRAVA_CLIENT_SECRET,
  redirectUri: REDIRECT_URL,
  authorizePath: `https://www.strava.com/oauth/authorize`
};

const authInstance = credentials => {
  return oauth2.create(credentials);
};

module.exports = {
  config: config,
  oauth: authInstance({
    client: {
      id: config.clientId,
      secret: config.clientSecret
    },
    auth: {
      tokenHost: "https://www.strava.com/oauth/authorize"
    }
  })
};
