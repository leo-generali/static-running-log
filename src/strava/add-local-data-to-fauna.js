const env = require("dotenv").config();
const faunadb = require("faunadb");
const activities = require("../../db/activities.json");
const laps = require("../../db/laps.json");

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNDA_DB_KEY
});

activities.forEach(activity => {
  client.query(q.Create(q.Collection("activities"), { data: activity }));
});

laps.forEach(lap => {
  client.query(q.Create(q.Collection("laps"), { data: lap }));
});
