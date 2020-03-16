const CHART_WIDTH = 800;
const CHART_HEIGHT = 300;

const ChartMixin = superclass =>
  class extends superclass {
    lapsBarChart() {
      // Get the heighest average speed in the lap
      let highestAvgSpeed, lowestAvgSpeed;
      this._laps.forEach((lap, index) => {
        if (index === 0) {
          highestAvgSpeed = lap.average_speed;
          lowestAvgSpeed = lap.average_speed;
        }

        if (lap.average_speed > highestAvgSpeed)
          highestAvgSpeed = lap.average_speed;
        if (lap.average_speed < lowestAvgSpeed)
          lowestAvgSpeed = lap.average_speed;
      });

      const width = this._calculateBarWidth();

      const bars = this._laps.map((lap, index) => {
        const height = this._calculateBarHeight(
          highestAvgSpeed,
          lowestAvgSpeed,
          lap.average_speed
        );

        return `
          <rect 
            width="${width - 1}"
            height="${height + 150}" 
            x="${index * width}" 
            y="${CHART_HEIGHT - height - 150}">
          </rect>`;
      });

      // const bars = this._laps.map()

      return `
        <svg class="chart" width="${CHART_WIDTH}" height="${CHART_HEIGHT}">
          ${[bars].join("")}
        </svg>`;
    }

    _calculateBarHeight(highestAvgSpeed, lowestAvgSpeed, lapSpeed) {
      const difference = highestAvgSpeed - lowestAvgSpeed;
      const differenceB = lapSpeed - lowestAvgSpeed;

      const ratio = differenceB / difference;

      return ratio * (CHART_HEIGHT - 150);
    }

    _calculateBarWidth() {
      return CHART_WIDTH / this._laps.length;
    }
  };

module.exports = ChartMixin;
