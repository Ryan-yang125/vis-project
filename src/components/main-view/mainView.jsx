/*
 * @Author: your name
 * @Date: 2021-01-13 18:32:01
 * @LastEditTime: 2021-01-13 19:00:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vis/src/components/mainView/mainView.jsx
 */
import ClusterView from "../utils/clusterView";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  mainViewContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  labelContainer: {
    marginTop: "2rem",
    fontSize: "1.2rem",
  },
}));
const MainView = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.mainViewContainer}>
      <div className={classes.labelContainer}>{props.label}</div>
      <ClusterView
        data={props.data}
        num={props.num}
        scale={props.scale}
        label={props.label}
      />
    </div>
  );
};
export default MainView;
