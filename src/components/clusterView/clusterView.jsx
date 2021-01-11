/*
 * @Author: your name
 * @Date: 2021-01-11 19:54:49
 * @LastEditTime: 2021-01-11 23:34:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vis/src/components/clusterView/clusterView.jsx
 */
import * as d3 from "d3";
import data from "../../assets/clustered-data.json";
import { useRef, useEffect } from "react";
export default function ClusterView(props) {
  const svgWidth = 600;
  const svgHeight = 600;
  const clusterNum = 2;
  const clusterLen = data[clusterNum].length;
  const clusterShots = data[clusterNum].shots;
  const clusterPhases = data[clusterNum].phases;
  const clusterPos = [];
  clusterPhases.forEach((phase) => {
    const eventSeq = phase.eventSequence;
    const eventPos = [];
    const eventLen = phase.phaseLength;
    eventSeq.forEach((event) => {
      eventPos.push(event.positions[0]);
    });
    if (eventSeq[eventLen - 1].positions[1].x !== 0)
      eventPos.push(eventSeq[eventLen - 1].positions[1]);
    clusterPos.push(eventPos);
  });
  console.log(clusterPos);
  const svgContainer = useRef(null);
  useEffect(() => {
    if (svgContainer.current) {
      const svg = d3
        .select(svgContainer.current)
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .style("background-color", "#456424");
      const myScale = d3.scaleLinear().domain([0, 100]).range([0, svgWidth]);
      svg
        .append("g")
        .append("text")
        .attr("x", 100)
        .attr("y", 100)
        .text(`Shots:${clusterShots}`);
      svg
        .append("g")
        .append("text")
        .attr("x", 50)
        .attr("y", 50)
        .text(`Phases:${clusterLen}`);
      const nodeG = svg.append("g");
      const linkG = svg.append("g");
      clusterPos.forEach((phasePos) => {
        for (let i = 0; i < phasePos.length - 1; i++) {
          let nodeColor = "#000";
          if (i === 0) nodeColor = "#f00";
          nodeG
            .append("circle")
            .attr("cx", myScale(phasePos[i].x))
            .attr("cy", svgHeight - myScale(phasePos[i].y))
            .attr("r", 3)
            .style("fill", nodeColor);
          linkG
            .append("line")
            .attr("x1", myScale(phasePos[i].x))
            .attr("y1", svgHeight - myScale(phasePos[i].y))
            .attr("x2", myScale(phasePos[i + 1].x))
            .attr("y2", svgHeight - myScale(phasePos[i + 1].y))
            .style("stroke-width", 2)
            .style("stroke", "#000");
        }
      });
    }
  });

  return <div ref={svgContainer}></div>;
}
