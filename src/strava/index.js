const db = require("diskdb");
const getData = require("./get-data");

const main = async () => {
  // Get the latest strava activites on your user home page
  const recentActivities = await getData();

  // Connect to the database
  db.connect("db", ["activities"]);

  // Loop over recent activities. If the activity isn't already saved
  // on the disk, save it. If it is... don't!
  recentActivities.forEach(activity => {
    // Check to see if an activity with this ID already exists
    const check = db.activities.find({ id: activity.id });

    // If the activity doesn't already exist in the DB, save it!
    if (check.length === 0) {
      db.activities.save(activity);
    }
  });
};

main();
