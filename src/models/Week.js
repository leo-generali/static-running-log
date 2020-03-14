const moment = require("moment");
const _ = require("lodash");

class Week {
  constructor(activities) {
    this._activities = activities;
  }

  stats() {
    const run = this._runStats();
    return { run };
  }

  runs(dayIndex) {
    const runs = this._activities.filter(activity => {
      const isRun = activity.type === "run";
      return isRun && activity.dayOfWeek() == dayIndex;
    });

    return runs;
  }

  dailyMileage(dayIndex) {
    const runs = this.runs(dayIndex);
    let miles = 0;
    runs.forEach(run => {
      miles = miles + run.miles;
    });
    return miles;
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
      miles: parseFloat((Math.round(milesRun * 100) / 100).toFixed(2)),
      time: timeRun
    };
  }
}

module.exports = Week;
