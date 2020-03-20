const strava = require("strava-v3");
const faunadb = require("faunadb");
const { config, oauth } = require("./utils/auth");

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNDA_DB_KEY
});

exports.handler = async (event, context) => {
  // Get the grant code
  const code = event.queryStringParameters.code;

  try {
    // Get the auth token using the grant code
    const authorizationToken = await oauth.authorizationCode.getToken({
      code: code,
      client_id: config.clientId,
      client_secret: config.clientSecret
    });

    // Extract user's access token from authorization token
    const accessToken = authorizationToken.access_token;

    const data = await strava.athlete.listActivities({
      access_token: accessToken
    });

    // const authResult = oauth.accessToken.create(authorizationToken);

    // // Get the access
    // const accessToken = authResult.token.access_token;
    // console.log({ accessToken });
    // console.log({ accessToken });

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (e) {
    console.log("Access Token Error", e.message);
    console.log(e);

    return {
      statusCode: e.statusCode || 500,
      body: JSON.stringify({
        error: e.message
      })
    };
  }
};
