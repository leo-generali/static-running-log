const moment = require("moment");
const _ = require("lodash");
const Week = require("./Week");
const Activity = require("./Activity");

const ACTIVITY_GOUP_TYPE = {
  ALL: "ACTIVITY_GROUP_ALL",
  WEEK: "ACTIVITY_GROUP_WEEK",
  MONTH: "ACTIVITY_GROUP_MONTH",
  YEAR: "ACTIVITY_GROUP_YEAR"
};

class ActivityGroup {
  constructor(activities, type = ACTIVITY_GOUP_TYPE.ALL) {
    this._activities = activities;
    this._type = type;
  }

  stats() {
    const stats = [];

    // Always add mileage stats for the group of time
    const run = this._runStats();
    stats.push(run);

    // Only calculate acute to chronic ration if on all
    if (this._type === ACTIVITY_GOUP_TYPE.ALL) {
      stats.push(this._actuteToChronicRatio());
    }

    return stats;
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
      return date.format("W");
    });

    const weeks = Object.keys(groups);
    const firstWeek = parseInt(weeks[0]);
    const latestWeek = parseInt(weeks[weeks.length - 1]);

    for (let i = firstWeek; i < latestWeek; i++) {
      if (groups[i] === undefined) {
        const lastDate = groups[i - 1][0].date;
        const missingWeekDate = moment(lastDate)
          .add(1, "weeks")
          .startOf("isoWeek");

        groups[i] = [Activity.dummy(missingWeekDate)];
      }
    }

    const orderedGroups = Object.values(groups)
      .map(week => {
        if (typeof week === "string") return week;
        return new Week(week);
      })
      .reverse();

    return orderedGroups;
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
      value: (Math.round(milesRun * 100) / 100).toFixed(2),
      text:
        this._type === ACTIVITY_GOUP_TYPE.ALL ? "miles so far" : "miles in 2020"
    };
  }

  _actuteToChronicRatio() {
    const lastFourWeeks = this.byWeek().slice(0, 4);
    const latestMileage = lastFourWeeks[0].stats().run.miles;

    let average = 0;
    lastFourWeeks.forEach(week => {
      average = average + week.stats().run.miles;
    });

    return {
      value: latestMileage / (average / 4),
      text: "Acute / Chronic"
    };
  }
}

module.exports = { ActivityGroup, ACTIVITY_GOUP_TYPE };
