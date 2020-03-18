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

// HTML Minify
const htmlmin = require("html-minifier");

const {
  byWeek,
  byDay,
  byMonth,
  byYear,
  formatDate
} = require("./src/eleventy-scripts/date");
const utils = require("./src/eleventy-scripts/utils");
const header = require("./src/eleventy-scripts/header");
const svg = require("./src/eleventy-scripts/svg");

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

  // Minify HTML if on production
  if (process.env.NODE_ENV === "production") {
    config.addTransform("htmlmin", function(content, outputPath) {
      if (outputPath.endsWith(".html")) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        });
        return minified;
      }

      return content;
    });
  }

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src/site",
      output: "_site"
    }
  };
};
