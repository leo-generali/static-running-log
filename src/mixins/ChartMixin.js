const d3 = require("d3");
const { JSDOM } = require("jsdom");

const Pace = require("../models/Pace");
const Distance = require("../models/Distance");

const CHART_WIDTH = 912;
const CHART_HEIGHT = 200;
const MARGIN = {
  top: 10,
  right: 0,
  bottom: 20,
  left: 32
};

const ChartMixin = superclass =>
  class extends superclass {
    lapsBarChart() {
      const { document } = new JSDOM().window;
      const body = d3.select(document.body);
      const svg = body.append("svg");

      // Get the maximum value of our laps (the fastest pace we ran)
      const { slowest } = this._speeds();
      const xScale = this._xScale();
      const yScale = this._yScale();
      const xAxis = this._xAxis();
      const yAxis = this._yAxis();

      svg
        .attr("viewBox", `0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`)
        .attr("preserveAspectRatio", "none")
        .attr("class", "bars")
        .selectAll("rect")
        .append("g")
        .data(this._laps)
        .join("rect")
        .attr("class", "fill-current text-strava")
        .attr("x", lap => xScale(lap.id))
        .attr("y", lap => yScale(lap.average_speed))
        .attr("width", xScale.bandwidth())
        .attr("height", lap => yScale(slowest) - yScale(lap.average_speed));

      svg
        .append("g")
        .selectAll("text")
        .data(this._laps)
        .enter()
        .append("text")
        .text(
          lap => `${Pace.metersPerSecondMinutesPerMile(lap.average_speed)}/mi`
        )
        .attr("text-anchor", "middle")
        .attr("x", lap => xScale(lap.id) + xScale.bandwidth() / 2)
        .attr("y", lap => yScale(lap.average_speed) - 5)
        .attr("class", "font-bold text-xs");

      svg
        .append("g")
        .attr("transform", `translate(0,${CHART_HEIGHT - MARGIN.bottom})`)
        .call(xAxis)
        .attr("class", "text-xs");

      svg
        .append("g")
        .attr("transform", `translate(${MARGIN.left}, 0)`)
        .call(yAxis)
        .attr("class", "text-xs");

      return body.node().innerHTML;
    }

    _speeds() {
      const fastest = d3.max(this._laps, lap => lap.average_speed);
      const slowest = d3.min(this._laps, lap => lap.average_speed);

      // We want there to be some padding between the fastest pace
      // and the slowest pace. (Not start directly at zero).
      const difference = fastest - slowest;
      const padding = difference / 3;

      return { fastest: fastest + padding, slowest: slowest - padding };
    }

    _xScale() {
      return d3
        .scaleBand()
        .domain(this._xDomain())
        .range([MARGIN.left, CHART_WIDTH])
        .padding(0.5);
    }

    _yScale() {
      const { fastest, slowest } = this._speeds();

      return d3
        .scaleLinear()
        .domain([slowest, fastest])
        .range([CHART_HEIGHT - MARGIN.bottom, MARGIN.top]);
    }

    _xDomain() {
      return this._laps.map(lap => lap.id);
    }

    _xAxis() {
      return d3
        .axisBottom(this._xScale())
        .tickSizeOuter(0)
        .tickFormat(lapId => {
          const lap = this._laps.find(val => val.id === lapId);
          return `${Distance.metersToMile(lap.distance)} mi`;
        });
    }

    _yAxis() {
      return d3
        .axisLeft(this._yScale())
        .tickSizeOuter(0)
        .tickFormat(pace => Pace.metersPerSecondMinutesPerMile(pace));
    }
  };

module.exports = ChartMixin;
