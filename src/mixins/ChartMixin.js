const d3 = require("d3");
const { JSDOM } = require("jsdom");

const CHART_WIDTH = 800;
const CHART_HEIGHT = 300;

const ChartMixin = superclass =>
  class extends superclass {
    lapsBarChart() {
      const { document } = new JSDOM().window;
      const body = d3.select(document.body);

      const svg = body
        .append("svg")
        .attr("width", CHART_WIDTH)
        .attr("height", CHART_HEIGHT);

      svg
        .append("line")
        .attr("x1", 100)
        .attr("y1", 100)
        .attr("x2", 200)
        .attr("y2", 200)
        .style("stroke", "rgb(255,0,0)")
        .style("stroke-width", 2);

      return body.node().innerHTML;
    }
  };

module.exports = ChartMixin;
