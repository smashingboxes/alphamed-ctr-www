import React, { useState, useRef, useEffect } from 'react';
import { Grid, Paper } from '@material-ui/core';
import validator from 'validator';
​
import { useStyles } from './disease-combobox.styles';
​
import { diseaseData } from './disease-combobox.data';
import CTRInput from '../../shared/ctr-input/ctr-input.component';
​
const DiseaseComboBox = ({
  onDiseaseAdd,
  onDiseaseRemove,
  error,
  handleError,
  diseases
}) => {
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [diseasesList, setDiseasesList] = useState([]);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [other, setOther] = useState('');
  const preSelectedDiseasesElement = useRef(null);
  const selectedDiseaseElement = useRef(null);
​
  const classes = useStyles();
​
  const onChange = () => {
    let currentSelected = preSelectedDiseasesElement.current.value;
​
    handleError();
​
    if (currentSelected === 'Other') {
      return setIsOtherSelected(true);
    }
​
    setOther('');
    setIsOtherSelected(false);
  };
​
  const handleAddDisease = (e) => {
    e.preventDefault();
​
    let currentSelected = preSelectedDiseasesElement.current.value;
​
    if (validator.isEmpty(currentSelected)) return;
​
    if (currentSelected === 'Other') {
      setIsOtherSelected(true);
      setSelectedDiseases([...selectedDiseases, other]);
​
      return onDiseaseAdd(other);
    }
​
    setIsOtherSelected(false);
​
    setDiseasesList((diseasesList) =>
      diseasesList.filter((data) => data !== currentSelected)
    );
    setSelectedDiseases([...selectedDiseases, currentSelected]);
​
    onDiseaseAdd(currentSelected);
  };
​
  const handleOnRemove = (e) => {
    e.preventDefault();
​
    let removeSelected = selectedDiseaseElement.current.value;
​
    if (validator.isEmpty(removeSelected)) return;
​
    if (!diseaseData.includes(removeSelected)) {
      setSelectedDiseases(
        selectedDiseases.filter((disease) => disease !== removeSelected)
      );
​
      return onDiseaseRemove(removeSelected);
    }
​
    setSelectedDiseases(
      selectedDiseases.filter((disease) => disease !== removeSelected)
    );
    setDiseasesList([...diseasesList, removeSelected].sort());
​
    onDiseaseRemove(removeSelected);
  };
​
  const handleChange = (event) => {
    const { value } = event.target;
​
    setOther(value);
  };
​
  useEffect(() => {
    setDiseasesList(diseaseData.sort());
​
    if (diseases) {
      setSelectedDiseases(diseases);
    }
  }, [setDiseasesList, diseases]);
​
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
              onChange={onChange}
              ref={preSelectedDiseasesElement}
              className={classes.select}
              multiple
            >
              {diseasesList.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </Paper>
          {error && <span style={{ color: '#FF5858' }}>&#10005; {error}</span>}
        </Grid>
        {isOtherSelected && (
          <CTRInput
            type='text'
            name='other'
            require={false}
            value={other}
            onChange={handleChange}
            label='Other'
          />
        )}
      </Grid>
​
      <Grid
        style={{ paddingLeft: 40, margin: '10px 0px' }}
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
              ref={selectedDiseaseElement}
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
​
export default DiseaseComboBox;