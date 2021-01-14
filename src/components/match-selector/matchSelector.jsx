/*
 * @Author: your name
 * @Date: 2021-01-09 16:16:25
 * @LastEditTime: 2021-01-14 15:03:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vis/src/components/grid.jsx
 */
import { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import matchData from "../../assets/match-data.json";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  Button,
  Paper,
  CircularProgress,
  Slider,
  Typography,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
import axios from "axios";
import MainView from "../main-view/mainView";
import ToolTip from "../tool-tip/tool-tip";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "10vw",
  },
  sliderControl: {
    margin: 0,
    padding: 0,
    fontSize: 4,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  confirmButton: {
    marginTop: "5vh",
  },
  formContainer: {
    marginLeft: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "12vw",
    minHeight: "90vh",
  },
  mainContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  clusterCard: {
    // minWidth: 650,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "65vw",
  },
  toolContainer: {
    display: "flex",
    width: "20vw",
  },
}));
const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
const MatchSelector = (props) => {
  const classes = useStyles();
  const [clusteredData, setClusteredData] = useState([]);
  const [competition, setCompetition] = useState(0);
  const [team, setTeam] = useState(0);
  const [match, setMatch] = useState(0);
  const [clusters, setClusters] = useState(10);
  const [ifLoading, setIfLoading] = useState(false);
  const [clusterIndex, setClusterIndex] = useState(0);
  const [pathChecked, setPathChecked] = useState(false);
  const handleCompetitionChange = (event) => {
    setCompetition(event.target.value);
  };
  const handleTeamChange = (event) => {
    setTeam(event.target.value);
  };
  const handleMatchChange = (event) => {
    setMatch(event.target.value);
  };
  const handleClustersChange = (event, value) => {
    setClusters(value);
  };
  const handelPathSliderChange = (event) => {
    setPathChecked(event.target.checked);
  };
  const getCompetitions = () => {
    const competitons = [];
    matchData.children.forEach((value, index) => {
      competitons.push(
        <MenuItem value={index} key={value.name}>
          {value.name}
        </MenuItem>
      );
    });
    return competitons;
  };
  const getTeams = () => {
    const teams = [];
    matchData.children[competition].children.forEach((value, index) => {
      teams.push(
        <MenuItem value={index} key={value.name}>
          {value.name}
        </MenuItem>
      );
    });
    return teams;
  };
  const getMatches = () => {
    const matches = [];
    const teams = matchData.children[competition].children[team];
    teams.children.forEach((value, index) => {
      matches.push(
        <MenuItem value={index} key={value.label}>
          {value.label}
        </MenuItem>
      );
    });
    return matches;
  };
  const sendMatches = async () => {
    const selectedMatch =
      matchData.children[competition].children[team].children[match];
    console.log(selectedMatch.wyId, clusters);
    try {
      setIfLoading(true);
      const response = await axios.get(
        `http://localhost:5500/?wyId=${selectedMatch.wyId}&clusters=${clusters}`
      );
      console.log(response.data, clusters);
      setIfLoading(false);
      setClusteredData(response.data);
    } catch (error) {
      setTimeout(() => {
        setIfLoading(false);
      }, 5000);
      console.log(error);
    }
  };
  const onBarClick = (value) => {
    setClusterIndex(value);
  };
  let clusterViewTop = <div></div>;
  let clusterViewOthers = <div></div>;
  // TODO cluterView refresh too many times
  if (clusteredData.length !== 0) {
    const selectedMatch =
      matchData.children[competition].children[team].children[match];
    clusterViewTop = (
      <MainView
        data={clusteredData}
        num={clusterIndex}
        scale={1.0}
        label={selectedMatch.label}
        ifShowAllPath={pathChecked}
      />
    );
    clusterViewOthers = (
      <ToolTip data={clusteredData} onBarClick={onBarClick} />
    );
  }
  return (
    <div className={classes.mainContainer}>
      <Paper elevation={1} className={classes.formContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel id="competition-select-label" color="primary">
            Competition
          </InputLabel>
          <Select
            labelId="competition-select-label"
            id="competition-select"
            value={competition}
            onChange={handleCompetitionChange}
          >
            {getCompetitions()}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="team-select-label">Team</InputLabel>
          <Select
            labelId="team-select-label"
            id="team-select"
            value={team}
            onChange={handleTeamChange}
          >
            {getTeams()}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="match-select-label">Match</InputLabel>
          <Select
            labelId="match-select-label"
            id="match-select"
            value={match}
            onChange={handleMatchChange}
          >
            {getMatches()}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Typography gutterBottom>Clusters</Typography>
          <PrettoSlider
            value={clusters}
            min={1}
            max={30}
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            defaultValue={clusters}
            onChange={handleClustersChange}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormControlLabel
            className={classes.sliderControl}
            value="top"
            control={<Switch color="primary" size="small" />}
            label="Show All Path"
            labelPlacement="start"
            checked={pathChecked}
            onChange={handelPathSliderChange}
          />
        </FormControl>
        <div className={classes.confirmButton}>
          <Button variant="contained" onClick={sendMatches}>
            Confirm
          </Button>
        </div>
      </Paper>
      <Paper elevation={5} className={classes.clusterCard}>
        {ifLoading ? (
          <CircularProgress size="5vw" color="inherit" />
        ) : (
          clusterViewTop
        )}
      </Paper>
      <Paper elevation={1} className={classes.toolContainer}>
        {clusterViewOthers}
      </Paper>
    </div>
  );
};
export default MatchSelector;
