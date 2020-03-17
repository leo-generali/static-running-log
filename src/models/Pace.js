const MIN_PER_MILE = 26.8224;

class Pace {
  static metersPerSecondMinutesPerMile(metersPerSecond) {
    const [minutes, percent] = (MIN_PER_MILE / metersPerSecond)
      .toString()
      .split(".");

    const seconds = Math.round(`.${percent}` * 60);

    if (seconds === 60) {
      return `${parseInt(minutes, 10) + 1}:00`;
    }

    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }
}

module.exports = Pace;
