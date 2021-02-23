/*
 * @Author: your name
 * @Date: 2021-01-13 22:16:02
 * @LastEditTime: 2021-02-23 15:21:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vis/src/components/utils/basicGraph.jsx
 */
import * as d3 from "d3";

const triangle = (svgGroup, size) =>
  svgGroup
    .append("path")
    .attr("d", d3.symbol().type(d3.symbolTriangle).size(size));

const circle = (svgGroup, size) =>
  svgGroup
    .append("path")
    .attr("d", d3.symbol().type(d3.symbolCircle).size(size));

const diamond = (svgGroup, size) =>
  svgGroup
    .append("path")
    .attr("d", d3.symbol().type(d3.symbolDiamond).size(size));

const cross = (svgGroup, size) =>
  svgGroup
    .append("path")
    .attr("d", d3.symbol().type(d3.symbolCross).size(size));

const star = (svgGroup, size) =>
  svgGroup.append("path").attr("d", d3.symbol().type(d3.symbolStar).size(size));

const wye = (svgGroup, size) =>
  svgGroup.append("path").attr("d", d3.symbol().type(d3.symbolWye).size(size));

const square = (svgGroup, size) =>
  svgGroup
    .append("path")
    .attr("d", d3.symbol().type(d3.symbolSquare).size(size));
export { triangle, circle, diamond, cross, star, wye, square };
