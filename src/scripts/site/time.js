const { fromS } = require("hh-mm-ss");

const secondsToDisplay = time => {
  const string = fromS(time, "hh:mm:ss").split(":");
  if (string[0] === "00") return `${string[1]}:${string[2]}`;
  return string.join(":");
};

module.exports = { secondsToDisplay };
