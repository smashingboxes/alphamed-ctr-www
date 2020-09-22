import React, { useState, useRef } from 'react';
import { Grid, Paper, MenuList, MenuItem, Button } from '@material-ui/core';

import { useStyles } from './disease-combobox.styles';

import { diseaseData } from './disease-combobox.data';


const DiseaseComboBox = ({ onItemAdd, onItemRemove }) => {

  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [preSelectDiseases, setPreSelectDiseases] = useState([]);
  const preSelectedDiseasesElement = useRef(null);
  const selectedDiseasElement = useRef(null);

  const classes = useStyles();

  const handleAddDisease = (e) => {
    e.preventDefault();
    let currentSelected = preSelectedDiseasesElement.current.value;
    setSelectedDiseases([...selectedDiseases, currentSelected])

    onItemAdd(currentSelected);
  }

  const handleOnRemove = (e) => {
    e.preventDefault();
    let removeSelected = selectedDiseasElement.current.value;
    setSelectedDiseases(selectedDiseases.filter((diseas) => removeSelected != diseas));
    onItemRemove(removeSelected);
  }

  return (
    <div>

      <Grid style={{ paddingLeft: 40, margin: "20px 0px" }} container alignItems="start" spacing={1}>
        <Grid item xs={3} style={{ textAlign: "right" }}>
          <div className={classes.selectLabel}>Disease</div>
        </Grid>
        <Grid container style={{ paddingRight: "" }} direction="column" alignItems="start" justify="flex-start" item xs={9}>
          <Paper
          elevation = {0}
          className={classes.paper}>
            <select
              ref={preSelectedDiseasesElement}
              className={classes.select}
              multiple>
              {diseaseData.map((data) => (
                <option key={data} value={data}>{data}</option>
              ))}
            </select>
          </Paper>
        </Grid>
      </Grid>

      <Grid style={{ paddingLeft: 40, margin: "20px 0px" }} container alignItems="start" spacing={1}>
        <Grid item xs={3}>
        </Grid>
        <Grid container style={{ paddingRight: "" }} direction="column" alignItems="start" justify="flex-start" item xs={9}>
        <div className={classes.centerized}>
          <button onClick={handleAddDisease} className={classes.UIbutton}>Add Disease</button>
        </div>
        <Paper elevation = {0} className={classes.paper}>
          <select
            ref={selectedDiseasElement}
            className={classes.select} multiple>
            {selectedDiseases.map((data) => (
              <option key={data} value={data}>{data}</option>
            ))}
          </select>
        </Paper>
        <div className={classes.centerized}>
          <button
            onClick={handleOnRemove}
            className={classes.UIbutton}>Remove Disease</button>
        </div>
        </Grid>
      </Grid>

    </div>
  );
};

export default DiseaseComboBox;
