const _ = require("lodash");

const StatsMixin = superclass =>
  class extends superclass {
    stats() {
      const stats = [];

      // Always add mileage stats for the group of time
      const run = this._runStats();
      stats.push(run);

      // Only calculate acute to chronic ration if on all
      if (this._type === superclass.types()["ALL"]) {
        stats.push(this._actuteToChronicRatio());
      }

      return stats;
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
          this._type === superclass.types()["ALL"]
            ? "miles so far"
            : "miles in 2020"
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
  };

module.exports = StatsMixin;
