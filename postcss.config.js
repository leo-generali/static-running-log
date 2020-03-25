const purgecss = require("@fullhuman/postcss-purgecss")({
  content: [
    "./src/site/**/*.njk",
    "./src/site/**/*.md",
    "./src/site/_data/*.js",
    "./src/models/*.js",
    "./src/mixins/*.js",
    "./src/scripts/cms/**/*.jsx"
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

const cssnano = require("cssnano");

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss-nested"),
    ...(process.env.NODE_ENV === "production" ? [purgecss, cssnano] : [])
  ]
};
