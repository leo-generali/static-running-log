const path = require("path");
const fs = require("fs");
const $ = require("cheerio");

module.exports = (icon, args) => {
  const data = fs.readFileSync(
    path.join(__dirname, `../../icons/${icon}.svg`),
    (err, contents) => {
      return contents;
    }
  );

  const element = $(data.toString("utf8"));

  // Add options args come through
  if (args.class) {
    element.addClass(args.class);
  }

  return element;
};
