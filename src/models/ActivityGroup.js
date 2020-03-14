const moment = require("moment");
const _ = require("lodash");

const Week = require("./Week");

class ActivityGroup {
  constructor(activities) {
    this._activities = activities;
  }

  stats() {
    const run = this._runStats();
    return { run };
  }

  byWeek() {
    const groups = _.groupBy(this._activities, data => {
      const date = moment(data.date);
      return date.format("YYYY-W");
    });

    return Object.values(groups).map(week => new Week(week));
  }

  _runStats() {
    let milesRun = 0;
    let timeRun = 0;

    this._activities.forEach(activity => {
      if (activity.type === "run") {
        milesRun = milesRun + activity.miles();
        timeRun = timeRun + activity.moving_time;
      }
    });

    return {
      miles: (Math.round(milesRun * 100) / 100).toFixed(2),
      time: timeRun
    };
  }
}

module.exports = ActivityGroup;
