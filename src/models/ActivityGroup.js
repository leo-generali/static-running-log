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

  months() {
    const months = _.groupBy(this._activities, data => {
      const date = moment(data.date);
      return date.format("M");
    });

    return Object.keys(months);
  }

  byWeek() {
    const groups = _.groupBy(this._activities, data => {
      const date = moment(data.date);
      return date.format("YYYY-W");
    });

    return Object.values(groups).map(week => new Week(week));
  }

  calendar() {
    const date = moment(this._activities[0].date);

    const firstDayOfMonth = date.startOf("month").format("E");
    const daysInMonth = date.daysInMonth();

    const calendar = this._groupActivitiesByDay(daysInMonth);

    return { firstDayOfMonth, daysInMonth, calendar };
  }

  _groupActivitiesByDay(daysInMonth) {
    return [...Array(daysInMonth).keys()].map(day => {
      const dayOfMonth = day + 1;
      const activitiesInDay = this._activities.filter(activity => {
        return moment(activity.date).format("D") == dayOfMonth;
      });

      return activitiesInDay;
    });
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
