const moment = require("moment");
const compose = require("lodash/fp/compose");
const { fromS } = require("hh-mm-ss");

// Mixins
const { ChartMixin, ActivityCMSMixin } = require("../mixins");
const Pace = require("./Pace");
const Distance = require("./Distance");
const activityKey = require("../site/_data/activityKey");

const WORKOUT_TYPE_MAP = {
  run: {
    null: "Easy Run",
    0: "Easy Run",
    2: "Long Run"
  },
  ride: {
    10: "Easy"
  },
  yoga: "Yoga"
};

class Index {
  constructor(args) {
    this.id = args.id;
    this.name = args.name;
    this.date = args.start_date_local;
    this.type = args.type.toLowerCase();
    this.workoutType = args.workout_type;

    // Private
    this._laps = args.laps;
    this._movingTime = args.moving_time;
    this._distance = args.distance;
  }

  miles() {
    return Distance.metersToMile(this._distance);
  }

  dayOfWeek() {
    return moment(this.date).format("E");
  }

  pace() {
    return `${Pace.metersPerSecondMinutesPerMile(
      this._distance / this._movingTime
    )}<span class='text-black text-sm uppercase tracking-wider'>/mi</span>`;
  }

  timeToDisplay() {
    const string = fromS(this._movingTime, "hh:mm:ss").split(":");
    if (string[0] === "00") return `${string[1]}:${string[2]}`;
    return string.join(":");
  }

  workoutTypeDisplay() {
    const isUndefined =
      WORKOUT_TYPE_MAP[this.type][this.workoutType] === undefined;

    return isUndefined
      ? this.type
      : WORKOUT_TYPE_MAP[this.type][this.workoutType];
  }

  color() {
    const { activity, bg, bgHover, text } = activityKey.find(
      key => key.workoutType === this.workoutType
    );

    return { activity, bg, bgHover, text };
  }
}

module.exports = compose(ChartMixin, ActivityCMSMixin)(Index);
