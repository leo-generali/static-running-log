const { config, oauth } = require("./utils/auth");

exports.handler = async (event, context) => {
  const authorizationUri = oauth.authorizationCode.authorizeURL({
    redirect_uri: config.redirectUri,
    scope: "read,activity:read_all"
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ authorizationUri })
  };
};
