const moment = require("moment");

class Week {
  constructor(activities) {
    this._activities = activities;
  }

  stats() {
    const run = this._runStats();
    return { run };
  }

  weekStartAndEnd() {
    const firstOfWeek = moment(this._activities[0].date)
      .startOf("isoWeek")
      .format("MMM D");

    const endOfWeek = moment(this._activities[0].date)
      .endOf("isoWeek")
      .format("D");

    return `${firstOfWeek} - ${endOfWeek}`;
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

module.exports = Week;
