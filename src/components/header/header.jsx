/*
 * @Author: your name
 * @Date: 2021-01-10 19:43:42
 * @LastEditTime: 2021-01-13 21:52:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vis/src/components/header/header.jsx
 */
import { makeStyles } from "@material-ui/core/styles";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
const useStyles = makeStyles((theme) => ({
  appContainer: {
    marginBottom: theme.spacing(2),
    backgroundColor: "#3F4B3B",
    color: "#fff",
    minHeight: theme.spacing(5),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  descrip: {
    margin: theme.spacing(2),
  },
}));
const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.appContainer}>
      <SportsSoccerIcon className={classes.descrip} />
      <p className={classes.descrip}>
        Automatic Discovery of Tactics in Spatio-Temporal Soccer Match Data
      </p>
    </div>
  );
};
export default Header;
