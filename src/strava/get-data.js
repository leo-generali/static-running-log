const fetch = require("node-fetch");
const env = require("dotenv").config();
const cheerio = require("cheerio");

const { STRAVA_CLIENT_SECRET, STRAVA_ATHLETE_ID } = process.env;
const url = `https://www.strava.com/athletes/${STRAVA_ATHLETE_ID}`;

const getText = async () => {
  const res = await fetch(url);
  const html = await res.text();
  return html;
};

const data = async () => {
  const html = await getText();
  const $ = cheerio.load(html);
  return $(`div`)
    .filter(function() {
      return $(this).data("reactClass") === "AthleteProfileApp";
    })
    .data("react-props").recentActivities;
};

module.exports = data;
