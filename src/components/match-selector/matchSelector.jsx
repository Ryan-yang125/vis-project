/*
 * @Author: your name
 * @Date: 2021-01-09 16:16:25
 * @LastEditTime: 2021-01-12 00:23:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vis/src/components/grid.jsx
 */
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import matchData from "../../assets/match-data.json";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button } from "@material-ui/core";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function (props) {
  const classes = useStyles();
  const [competition, setCompetition] = useState(0);
  const [team, setTeam] = useState(0);
  const [match, setMatch] = useState(0);
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
        <MenuItem value={index} key={value.wyId}>
          {`${teams.name} VS ${value.name}`}
        </MenuItem>
      );
    });
    return matches;
  };
  //TODO
  const sendMatches = async () => {
    const selectedMatch =
      matchData.children[competition].children[team].children[match];
    console.log(selectedMatch.wyId);
    try {
      const response = await axios.get(
        `http://localhost:5500/?wyId=${selectedMatch.wyId}`
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FormControl className={classes.formControl}>
        <InputLabel id="competition-select-label">Competition</InputLabel>
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
        <Button variant="contained" onClick={sendMatches}>
          Confirm
        </Button>
      </FormControl>
    </div>
  );
}
