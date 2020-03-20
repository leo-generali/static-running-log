const { config, oauth } = require("./utils/auth");

exports.handler = async (event, context) => {
  const authorizationUri = oauth.authorizationCode.authorizeURL({
    redirect_uri: config.redirectUri,
    scope: "read,activity:read_all"
  });

  return {
    statusCode: 302,
    headers: {
      Location: authorizationUri,
      "Cache-Control": "no-cache" // Disable caching of this response
    },
    body: "" // return body for local dev
  };
};
