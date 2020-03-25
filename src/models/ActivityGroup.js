const moment = require("moment");
const _ = require("lodash");
const compose = require("lodash/fp/compose");

// Mixing
const { StatsMixin } = require("../mixins");

const Week = require("./Week");
// const Activity = require("./Activity");

class Index {
  constructor(activities, type = Index.types()["ALL"]) {
    this._activities = activities;
    this._type = type;
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

        // groups[i] = [Activity.dummy(missingWeekDate)];
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

  static types() {
    return {
      ALL: "ACTIVITY_GROUP_ALL",
      WEEK: "ACTIVITY_GROUP_WEEK",
      MONTH: "ACTIVITY_GROUP_MONTH",
      YEAR: "ACTIVITY_GROUP_YEAR"
    };
  }
}

module.exports = compose(StatsMixin)(Index);
