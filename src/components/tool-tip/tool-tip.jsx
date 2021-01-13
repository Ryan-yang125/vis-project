/*
 * @Author: your name
 * @Date: 2021-01-12 12:54:11
 * @LastEditTime: 2021-01-13 18:27:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vis/src/components/right-property/right-property.jsx
 */
import { makeStyles } from "@material-ui/core/styles";
import BarChart from "../utils/barChart";
const useStyles = makeStyles((theme) => ({
  toolTipContainer: {
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    overflowX: "hidden",
    maxHeight: "90vh",
    marginRight: "1vw",
    width: "95%",
  },
}));
const ToolTip = (props) => {
  const classes = useStyles();
  //props.data is ranked by shots
  const barChartDataByShot = [];
  props.data.forEach((value, index) => {
    barChartDataByShot.push({ name: index, value: value.shots });
  });
  // ranked it by phase
  const barChartDataByPhase = [];
  props.data.forEach((value, index) => {
    barChartDataByPhase.push({ name: index, value: value.length });
  });
  barChartDataByPhase.sort((a, b) => b.value - a.value);
  const barChartContainer = [];
  barChartContainer.push(
    <BarChart
      key="shots"
      data={barChartDataByShot}
      label="Shots"
      onBarClick={props.onBarClick}
    />
  );
  barChartContainer.push(
    <BarChart
      key="phases"
      data={barChartDataByPhase}
      label="Phases"
      onBarClick={props.onBarClick}
    />
  );
  return <div className={classes.toolTipContainer}>{barChartContainer}</div>;
};
export default ToolTip;
