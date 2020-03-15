// Markdown Customization
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const markdownOptions = {
  html: true,
  breaks: true
};

const customEleventyMarkdownLibrary = markdownIt(markdownOptions).use(
  markdownItAttrs
);

const {
  byWeek,
  byDay,
  byMonth,
  byYear,
  formatDate
} = require("./src/scripts/site/date");
const utils = require("./src/scripts/site/utils");
const header = require("./src/scripts/site/header");
const svg = require("./src/scripts/site/svg");

module.exports = config => {
  // Filters
  config.addFilter("byWeek", byWeek);
  config.addFilter("byDay", byDay);
  config.addFilter("activitiesByMonth", byMonth);
  config.addFilter("activitiesByYear", byYear);
  config.addFilter("formatDate", formatDate);
  config.addFilter("svg", svg);
  config.addFilter("split", (string, separator) => string.split(separator));

  Object.entries({ ...utils }).forEach(([name, func]) => {
    config.addFilter(name, func);
  });

  config.addShortcode("header", header);

  config.addFilter("log", content => {
    console.log(content);
  });

  config.addPassthroughCopy("./src/site/favicon.ico");

  config.setLibrary("md", customEleventyMarkdownLibrary);

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src/site",
      output: "_site"
    }
  };
};
