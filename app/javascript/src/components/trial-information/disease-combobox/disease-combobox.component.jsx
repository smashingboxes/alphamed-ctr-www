import React, { useState } from 'react';
import { Paper, MenuList, MenuItem, Button } from '@material-ui/core';

import { useStyles } from './disease-combobox.styles';

import { diseaseData } from './disease-combobox.data';

const DiseaseComboBox = () => {
  const [selectedDiseases, setSelectedDiseases] = useState([]);

  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.paper}>
        <MenuList>
          {diseaseData.map((data) => (
            <MenuItem key={data}>{data}</MenuItem>
          ))}
        </MenuList>
      </Paper>
      <Button>Add Disease</Button>
      <Paper className={classes.paper}>
        <MenuList>
          {selectedDiseases.map((data) => (
            <MenuItem key={data}>{data}</MenuItem>
          ))}
        </MenuList>
      </Paper>
    </div>
  );
};

export default DiseaseComboBox;
