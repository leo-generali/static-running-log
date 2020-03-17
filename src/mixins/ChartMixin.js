const CHART_WIDTH = 800;
const CHART_HEIGHT = 330;
const METERS_PER_LAP = 1609.34;
const MIN_PER_MILE = 26.8224;

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
        const height =
          this._calculateBarHeight(
            highestAvgSpeed,
            lowestAvgSpeed,
            lap.average_speed
          ) - 17;

        const x = index * width;
        const y = CHART_HEIGHT - height - 150;

        const label = this._getLabel(lap);
        const pace = this._getPace(lap);

        return `
          <rect 
            width="${width - 1}"
            height="${height + 150}" 
            x="${x}" 
            y="${y}">
          </rect>
          <text 
            text-anchor="middle"
            x="${x + width / 2}" 
            y="${CHART_HEIGHT - 10}" 
            class="text-sm font-semibold text-white fill-current" >
            ${label}
          </text>
          <text 
            text-anchor="middle"
            x="${x + width / 2}" 
            y="${y - 5}" 
            class="text-sm font-semibold text-strava fill-current" >
            ${pace}
          </text>
          `;
      });

      return `
        <svg class="chart" width="${CHART_WIDTH}" height="${CHART_HEIGHT}">
          ${bars.join("")}
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

    _getLabel(lap) {
      const ratio = lap.distance / METERS_PER_LAP;
      const percentOfMileComplete = Math.round(ratio * 100) / 100;
      return `${percentOfMileComplete} mi`;
    }

    _getPace(lap) {
      const [minutes, percent] = (MIN_PER_MILE / lap.average_speed)
        .toString()
        .split(".");

      const seconds = Math.round(`.${percent}` * 60);

      return `${minutes}:${seconds}/mi`;
    }
  };

module.exports = ChartMixin;