import React, { useState, useRef, useEffect } from 'react';
import { Grid, Paper } from '@material-ui/core';
import validator from 'validator';

import { useStyles } from './disease-combobox.styles';

import { diseaseData } from './disease-combobox.data';

const DiseaseComboBox = ({
  onDiseaseAdd,
  onDiseaseRemove,
  error,
  handleError,
  diseases
}) => {
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [preSelectDiseases, setPreSelectDiseases] = useState([]);
  const preSelectedDiseasesElement = useRef(null);
  const selectedDiseasElement = useRef(null);

  const classes = useStyles();

  const handleAddDisease = (e) => {
    e.preventDefault();
    let currentSelected = preSelectedDiseasesElement.current.value;
    setSelectedDiseases([...selectedDiseases, currentSelected]);

    if (validator.isEmpty(currentSelected)) return;

    if (currentSelected === 'Other') {
      setIsOtherSelected(true);
      setSelectedDiseases([...selectedDiseases, other]);

      return onDiseaseAdd(other);
    }

    setIsOtherSelected(false);

    setDiseasesList((diseasesList) =>
      diseasesList.filter((data) => data !== currentSelected)
    );
    setSelectedDiseases([...selectedDiseases, currentSelected]);

    onDiseaseAdd(currentSelected);
  };

  const handleOnRemove = (e) => {
    e.preventDefault();

    let removeSelected = selectedDiseaseElement.current.value;

    if (validator.isEmpty(removeSelected)) return;

    if (!diseaseData.includes(removeSelected)) {
      setSelectedDiseases(
        selectedDiseases.filter((disease) => disease !== removeSelected)
      );

      return onDiseaseRemove(removeSelected);
    }

    setSelectedDiseases(
      selectedDiseases.filter((disease) => disease !== removeSelected)
    );
    setDiseasesList([...diseasesList, removeSelected].sort());

    onDiseaseRemove(removeSelected);
  };

  const handleChange = (event) => {
    const { value } = event.target;

    setOther(value);
  };

  useEffect(() => {
    setDiseasesList(diseaseData.sort());

    if (diseases) {
      setSelectedDiseases(diseases);
    }
  }, [setDiseasesList, diseases]);

  return (
    <div>
      <Grid
        style={{ paddingLeft: 40, margin: '20px 0px' }}
        container
        alignItems='start'
        spacing={1}
      >
        <Grid item xs={3} style={{ textAlign: 'right' }}>
          <div className={classes.selectLabel}>Disease</div>
        </Grid>
        <Grid
          container
          style={{ paddingRight: '' }}
          direction='column'
          alignItems='start'
          justify='flex-start'
          item
          xs={9}
        >
          <Paper elevation={0} className={classes.paper}>
            <select
              ref={preSelectedDiseasesElement}
              className={classes.select}
              multiple
            >
              {diseaseData.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </Paper>
        </Grid>
      </Grid>

      <Grid
        style={{ paddingLeft: 40, margin: '20px 0px' }}
        container
        alignItems='start'
        spacing={1}
      >
        <Grid item xs={3}></Grid>
        <Grid
          container
          style={{ paddingRight: '' }}
          direction='column'
          alignItems='start'
          justify='flex-start'
          item
          xs={9}
        >
          <div className={classes.centerized}>
            <button onClick={handleAddDisease} className={classes.UIbutton}>
              Add Disease
            </button>
          </div>
          <Paper elevation={0} className={classes.paper}>
            <select
              ref={selectedDiseasElement}
              className={classes.select}
              multiple
            >
              {selectedDiseases.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </Paper>
          <div className={classes.centerized}>
            <button onClick={handleOnRemove} className={classes.UIbutton}>
              Remove Disease
            </button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default DiseaseComboBox;
