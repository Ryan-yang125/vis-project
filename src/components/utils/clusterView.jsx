/*
 * @Author: your name
 * @Date: 2021-01-11 19:54:49
 * @LastEditTime: 2021-01-12 15:58:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vis/src/components/clusterView/clusterView.jsx
 */
import * as d3 from "d3";
import { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyle = makeStyles((theme) => ({
  svgContainer: {
    margin: theme.spacing(2),
  },
}));

const ClusterView = (props) => {
  const classes = useStyle();
  const topSvg = useRef(null);
  useEffect(() => {
    const svgWidth = 1150 * props.scale;
    const svgHeight = 720 * props.scale;
    const clusterNum = props.num;
    const clusterPos = [];
    const clusterLen = props.data[clusterNum].length;
    const clusterShots = props.data[clusterNum].shots;
    const clusterPhases = props.data[clusterNum].phases;
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
    if (topSvg.current) {
      const margin = 3;
      const svg = d3
        .select(topSvg.current)
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr(
          "viewBox",
          `0 0 ${svgWidth / props.scale} ${svgHeight / props.scale}`
        )
        .attr("preserveAspectRatio", "none");
      svg.selectAll(".notField").remove();
      const myXScale = d3.scaleLinear().domain([0, 100]).range([0, svgWidth]);
      const myYScale = d3.scaleLinear().domain([0, 100]).range([0, svgHeight]);
      svg
        .append("g")
        .classed("notField", true)
        .append("text")
        .attr("x", 100)
        .attr("y", 100)
        .text(`Shots:${clusterShots}`);
      svg
        .append("g")
        .classed("notField", true)

        .append("text")
        .attr("x", 50)
        .attr("y", 50)
        .text(`Phases:${clusterLen}`);
      const nodeG = svg.append("g").classed("notField", true);
      const linkG = svg.append("g").classed("notField", true);
      clusterPos.forEach((phasePos) => {
        for (let i = 0; i < phasePos.length - 1; i++) {
          let nodeColor = "#000";
          let howMargin = !phasePos[i].y
            ? -margin
            : phasePos[i].y === 100
            ? margin
            : 0;
          if (i === 0) nodeColor = "#f00";
          nodeG
            .append("circle")
            .attr("cx", myXScale(phasePos[i].x))
            .attr("cy", svgHeight + howMargin - myYScale(phasePos[i].y))
            .attr("r", 3)
            .style("fill", nodeColor);
          linkG
            .append("line")
            .attr("x1", myXScale(phasePos[i].x))
            .attr("y1", svgHeight + howMargin - myYScale(phasePos[i].y))
            .attr("x2", myXScale(phasePos[i + 1].x))
            .attr("y2", svgHeight + howMargin - myYScale(phasePos[i + 1].y))
            .style("strokeWidth", 2)
            .style("stroke", "#000");
        }
      });
    }
  }, [props]);

  return (
    <div className={classes.svgContainer}>
      <svg ref={topSvg}>
        <g className="field">
          {" "}
          <rect y="0" x="0" height="720" fill="green" width="1150" />
          <path
            stroke="white"
            strokeWidth="2"
            d="m575 20h-525v680h1050v-680h-525v680z"
            fill="green"
          />
          <circle
            r="91.5"
            fillOpacity="0"
            stroke="white"
            cy="360"
            cx="575"
            strokeWidth="2"
          />
          <circle cy="360" cx="575" r="2" stroke="white" fill="white" />
          <circle cy="360" cx="160" r="2" stroke="white" fill="white" />
          <circle cy="360" cx="990" r="2" stroke="white" fill="white" />
          <path
            stroke="white"
            strokeWidth="2"
            d="m50 324.4h-10v72.2h10z"
            fillOpacity="0"
          />
          <path
            stroke="white"
            strokeWidth="2"
            d="m1100 324.4h10v72.2h-10z"
            fillOpacity="0"
          />
          <path
            stroke="white"
            strokeWidth="2"
            d="m50 269.4h55v182.2h-55z"
            fillOpacity="0"
          />
          <path
            stroke="white"
            strokeWidth="2"
            d="m1100 269.4h-55v182.2h55z"
            fillOpacity="0"
          />
          <path
            stroke="white"
            strokeWidth="2"
            d="m50 159.4h165v402.2h-165z"
            fillOpacity="0"
          />
          <path
            stroke="white"
            strokeWidth="2"
            d="m1100 159.4h-165v402.2h165z"
            fillOpacity="0"
          />
          <path
            stroke="white"
            strokeWidth="2"
            d="m215 286.88a91.5 91.5 0 0 1 0 146.24z"
            fill="green"
          />
          <path
            stroke="white"
            strokeWidth="2"
            d="m935 286.88a91.5 91.5 0 0 0 0 146.24z"
            fill="green"
          />
          <path
            stroke="white"
            strokeWidth="2"
            d="m50 30a10 10 0 0 0 10 -10h-10z"
            fillOpacity="0"
          />
          <path
            stroke="white"
            strokeWidth="2"
            d="m60 700a10 10 0 0 0 -10 -10v10z"
            fillOpacity="0"
          />
          <path
            stroke="white"
            strokeWidth="2"
            d="m1100 690a10 10 0 0 0 -10 10h10z"
            fillOpacity="0"
          />
          <path
            stroke="white"
            strokeWidth="2"
            d="m1090 20a10 10 0 0 0 10 10v-10z"
            fillOpacity="0"
          />
        </g>
      </svg>
    </div>
  );
};
export default ClusterView;
