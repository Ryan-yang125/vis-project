/*
 * @Author: your name
 * @Date: 2021-01-12 22:28:36
 * @LastEditTime: 2021-01-13 18:28:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vis/src/components/utils/barChart.jsx
 */
import { makeStyles } from "@material-ui/core/styles";
import { useRef, useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import * as d3 from "d3";
const useStyles = makeStyles((theme) => ({
  barChartContainer: {
    margin: theme.spacing(2),
    width: "90%",
    height: "100%",
  },
}));
const BarChart = (props) => {
  const classes = useStyles();
  const barChartSvg = useRef(null);
  useEffect(() => {
    let maxY = -1;
    props.data.forEach((item) => {
      if (maxY < item.value) maxY = item.value;
    });
    if (barChartSvg.current) {
      const margin = { top: 30, right: 30, bottom: 70, left: 60 };
      const svgWidth = 800 - margin.left - margin.right;
      const svgHeight = 1100 - margin.top - margin.bottom;
      const svg = d3.select(barChartSvg.current);
      svg.selectAll("*").remove();
      // X axis
      const xAxis = d3
        .scaleBand()
        .range([0, svgWidth])
        .domain(props.data.map((item) => item.name))
        .padding(0.2);
      // svg.append("g").call(d3.axisBottom(xAxis));
      // Y axis
      const yAxis = d3
        .scaleLinear()
        .domain([0, maxY * 1.2])
        .range([svgHeight, 0]);
      // svg.append("g").call(d3.axisLeft(yAxis));
      // label
      svg
        .append("g")
        .append("text")
        .attr("x", svgWidth / 2)
        .attr("y", 1.5 * margin.top)
        .attr("text-anchor", "middle")
        .style("font-size", "46px")
        .style("text-decoration", "underline")
        .text(`Ranked by ${props.label}`);
      // rect
      const bar = svg.selectAll("rect").data(props.data).enter().append("g");
      bar
        .append("rect")
        .attr("x", (d) => xAxis(d.name))
        .attr("y", (d) => yAxis(d.value))
        .attr("width", xAxis.bandwidth())
        .attr("height", (d) => svgHeight - yAxis(d.value))
        .attr("fill", "#285943")
        .style("cursor", "pointer")
        .on("click", (event, d) => {
          props.onBarClick(d.name);
        });
      bar
        .append("text")
        .attr("x", (d) => xAxis(d.name))
        .attr("y", (d) => yAxis(d.value))
        .attr("dx", "0.20em")
        .attr("dy", "-0.35em")
        .attr("font-size", 40)
        .text((d) => (!d.value ? "" : d.value));
    }
  }, [props]);
  return (
    <Paper className={classes.barChartContainer} elevation={1}>
      <svg ref={barChartSvg} viewBox="0 0 800 1000"></svg>
    </Paper>
  );
};
export default BarChart;
