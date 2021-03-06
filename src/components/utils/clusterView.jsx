import * as d3 from "d3";
import { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as basicGraph from "./basicGraph";
const useStyle = makeStyles((theme) => ({
  svgContainer: {
    width: "90%",
    height: "80%",
    position: "relative",
  },
  svgMove: {
    width: "100%",
    height: "100%",
    position: "absolute",
    // left: "1vw",
    top: "4vh",
  },
}));

const ClusterView = (props) => {
  const classes = useStyle();
  const topSvg = useRef(null);

  useEffect(() => {
    // parse data into positions[]
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
        eventPos.push({
          x: event.positions[0].x,
          y: event.positions[0].y,
          evenName: event.eventName,
        });
      });
      if (eventSeq[eventLen - 1]?.positions[1]?.x !== 0)
        eventPos.push({
          x: eventSeq[eventLen - 1].positions[1].x,
          y: eventSeq[eventLen - 1].positions[1].y,
          evenName: eventSeq[eventLen - 1].eventName,
        });
      clusterPos.push(eventPos);
    });
    //svg render directly on dom by useRef
    if (topSvg.current) {
      const margin = 9.5;
      const svgWidth = 1050;
      const svgHeight = 688;
      const svg = d3.select(topSvg.current);
      svg.selectAll("*").remove();
      const myXScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([0, svgWidth - 2 * margin]);
      const myYScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([0, svgHeight - 2 * margin]);
      //base info
      svg
        .append("g")
        .append("text")
        .style("font-size", "20px")
        .style("text-decoration", "underline")
        .attr("transform", "translate(50,40)")
        .text(`Shots:${clusterShots}\nPhases:${clusterLen}`);
      //legend
      const symbolSize = 300;
      const lengend = svg.append("g");
      basicGraph
        .circle(lengend, symbolSize)
        .attr("fill", "red")
        .attr("transform", "translate(60,65)");

      lengend
        .append("text")
        .text("Start")
        .style("font-size", "20px")
        .attr("transform", "translate(80,70)");
      basicGraph
        .triangle(lengend, symbolSize)
        .attr("fill", "blue")
        .attr("transform", "translate(60,95)");
      lengend
        .append("text")
        .text("Pass")
        .style("font-size", "20px")
        .attr("transform", "translate(80,100)");
      basicGraph
        .star(lengend, symbolSize)
        .attr("fill", "#f1404b")
        .attr("transform", "translate(60,125)");
      lengend
        .append("text")
        .text("Shot")
        .style("font-size", "20px")
        .attr("transform", "translate(80,130)");
      basicGraph
        .wye(lengend, symbolSize)
        .attr("fill", "#EFDC05")
        .attr("transform", "translate(150,65)");
      lengend
        .append("text")
        .text("Duel")
        .style("font-size", "20px")
        .attr("transform", "translate(170,70)");
      basicGraph
        .square(lengend, symbolSize)
        .attr("fill", "#FFFFF3")
        .attr("transform", "translate(150,95)");
      lengend
        .append("text")
        .text("Others on the Ball")
        .style("font-size", "20px")
        .attr("transform", "translate(170,100)");
      basicGraph
        .cross(lengend, symbolSize)
        .attr("fill", "#49010F")
        .attr("transform", "translate(150,125)");
      lengend
        .append("text")
        .text("Free Kick")
        .style("font-size", "20px")
        .attr("transform", "translate(170,130)");
      const phaseGs = svg.append("g");
      // highlight a phase when click on the first node
      const strokOpacity = props.ifShowAllPath ? 1 : 0;
      const highLightPhase = (phaseGroup) => {
        // highLight or turnoff node
        const currentDis = phaseGroup.selectAll("path").attr("display");
        const newDis = currentDis === "none" ? "initial" : "none";
        phaseGroup.selectAll("path").attr("display", newDis);
        // opacity
        if (!strokOpacity) {
          const currentOpac = phaseGroup
            .selectAll("line")
            .attr("stroke-opacity");
          const newOpac = currentOpac.toString() === "0" ? "1.0" : "0";
          phaseGroup.selectAll("line").attr("stroke-opacity", newOpac);
        }
      };
      clusterPos.forEach((phasePos, index) => {
        // add each phase in a group
        const phaseGroup = phaseGs.append("g").classed(`phase-${index}`, true);
        for (let i = 0; i < phasePos.length; i++) {
          let nodeColor = "#000";
          let nodeShow = "none";
          let howMargin = !phasePos[i].y
            ? -margin
            : phasePos[i].y === 100
            ? margin
            : 0;
          const translateP = `translate(${myXScale(phasePos[i].x)},${
            svgHeight + howMargin - myYScale(phasePos[i].y)
          })`;
          // if this a start node
          if (i === 0) {
            nodeColor = "#f00";
            nodeShow = "initial";
            phaseGroup
              .append("circle")
              .attr("cx", myXScale(phasePos[i].x))
              .attr("cy", svgHeight + howMargin - myYScale(phasePos[i].y))
              .attr("r", margin)
              .attr("display", nodeShow)
              .style("fill", nodeColor)
              .on("click", () => {
                highLightPhase(phaseGroup);
              });
          } else {
            switch (phasePos[i].evenName) {
              case "Pass":
                basicGraph
                  .triangle(phaseGroup, symbolSize)
                  .attr("transform", translateP)
                  .attr("fill", "blue")
                  .attr("display", nodeShow);
                break;
              case "Duel":
                basicGraph
                  .wye(phaseGroup, symbolSize)
                  .attr("transform", translateP)
                  .attr("display", nodeShow)
                  .attr("fill", "#EFDC05");
                break;
              case "Shot":
                basicGraph
                  .star(phaseGroup, symbolSize)
                  .attr("transform", translateP)
                  .attr("display", nodeShow)
                  .attr("fill", "#f1404b");
                break;
              case "Others on the ball":
                basicGraph
                  .square(phaseGroup, symbolSize)
                  .attr("transform", translateP)
                  .attr("display", nodeShow)
                  .attr("fill", "#FFFFF3");
                break;
              case "Free Kick":
                basicGraph
                  .cross(phaseGroup, symbolSize)
                  .attr("transform", translateP)
                  .attr("display", nodeShow)
                  .attr("fill", "#49010F");
                break;
              default:
                basicGraph
                  .diamond(phaseGroup, symbolSize)
                  .attr("transform", translateP)
                  .attr("display", nodeShow)
                  .attr("fill", "#AACD6E");
                break;
            }
          }
          if (i < phasePos.length - 1) {
            phaseGroup
              .append("line")
              .attr("x1", myXScale(phasePos[i].x))
              .attr("y1", svgHeight + howMargin - myYScale(phasePos[i].y))
              .attr("x2", myXScale(phasePos[i + 1].x))
              .attr("y2", svgHeight + howMargin - myYScale(phasePos[i + 1].y))
              .attr("stroke-opacity", strokOpacity)
              .style("stroke-width", 3)
              .style("stroke", "#000");
          }
        }
      });
    }
  }, [props]);

  return (
    <div className={classes.svgContainer}>
      <svg className={classes.svgMove} viewBox="40 16 1070 688">
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
      <svg
        ref={topSvg}
        className={classes.svgMove}
        viewBox="0 0 1050 688"
      ></svg>
    </div>
  );
};
export default ClusterView;
