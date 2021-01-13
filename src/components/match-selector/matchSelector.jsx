/*
 * @Author: your name
 * @Date: 2021-01-09 16:16:25
 * @LastEditTime: 2021-01-13 18:45:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vis/src/components/grid.jsx
 */
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import matchData from "../../assets/match-data.json";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button, Paper, CircularProgress } from "@material-ui/core";
import axios from "axios";
import MainView from "../main-view/mainView";
import ToolTip from "../tool-tip/tool-tip";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "10vw",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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

const MatchSelector = (props) => {
  const classes = useStyles();
  const [clusteredData, setClusteredData] = useState([]);
  const [competition, setCompetition] = useState(0);
  const [team, setTeam] = useState(0);
  const [match, setMatch] = useState(0);
  const [ifLoading, setIfLoading] = useState(false);
  const [clusterIndex, setClusterIndex] = useState(0);
  const handleCompetitionChange = (event) => {
    setCompetition(event.target.value);
  };
  const handleTeamChange = (event) => {
    setTeam(event.target.value);
  };
  const handleMatchChange = (event) => {
    setMatch(event.target.value);
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
    console.log(selectedMatch.wyId);
    try {
      setIfLoading(true);
      const response = await axios.get(
        `http://localhost:5500/?wyId=${selectedMatch.wyId}`
      );
      console.log(response.data);
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
        <Button variant="contained" onClick={sendMatches}>
          Confirm
        </Button>
      </Paper>
      <Paper elevation={5} className={classes.clusterCard}>
        {ifLoading ? (
          <CircularProgress size="5vw" color="inherit" />
        ) : (
          clusterViewTop
        )}
      </Paper>
      <Paper elevation={2} className={classes.toolContainer}>
        {clusterViewOthers}
      </Paper>
    </div>
  );
};
export default MatchSelector;
