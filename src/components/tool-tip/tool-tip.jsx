/*
 * @Author: your name
 * @Date: 2021-01-12 12:54:11
 * @LastEditTime: 2021-01-12 16:15:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vis/src/components/right-property/right-property.jsx
 */
import ClusterView from "../utils/clusterView";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  toolTipContainer: {
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    overflowX: "hidden",
    maxHeight: "90vh",
    marginRight: "1vw",
  },
}));
const ToolTip = (props) => {
  const classes = useStyles();
  const viewNums = 5;
  const clusterViews = [];
  for (let i = 1; i <= viewNums; i++) {
    clusterViews.push(<ClusterView data={props.data} num={i} scale={0.3} />);
  }
  return <div className={classes.toolTipContainer}>{clusterViews}</div>;
};
export default ToolTip;
