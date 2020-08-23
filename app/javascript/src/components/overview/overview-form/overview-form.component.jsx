import React, { useState } from 'react';
import { Grid, Paper, Checkbox, FormControlLabel } from '@material-ui/core';

import {
  OverviewContainer,
  OverviewFormContainer,
  FormContainer,
  CheckboxContainer,
  LabelContainer
} from './overview-form.styles';

import { typeOfStudy } from './overview-form.data';

import FormInput from '../../shared/form-input/form-input.component';
import FormSelect from '../../shared/form-select/form-select.component';
import FormEditor from '../../shared/form-editor/form-editor.component';

const OverviewForm = () => {
  const [overviewDetails, setOverviewDetails] = useState({
    typeOfStudy: '',
    title: '',
    runningHead: '',
    keywords: '',
    identifier: '',
    sponsor: ''
  });
  const [check, setCheck] = useState({
    checkedA: false
  });

  const handleCheckChange = (event) => {
    setCheck({ ...check, [event.target.name]: event.target.checked });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setOverviewDetails({ [name]: value });
  };

  return (
    <Paper elevation={0}>
      <OverviewContainer>Overview</OverviewContainer>
      <OverviewFormContainer>
        <FormContainer>
          <FormEditor label='Section Editor Comments' />
        </FormContainer>
        <FormContainer>
          <FormSelect label='Type of Study'>
            {typeOfStudy.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </FormSelect>
        </FormContainer>
        <FormContainer>
          <FormInput
            type='text'
            name='title'
            value={overviewDetails.title}
            onChange={handleChange}
            label='Title'
          />
        </FormContainer>
        <FormContainer>
          <FormInput
            type='text'
            name='runningHead'
            value={overviewDetails.runningHead}
            onChange={handleChange}
            label='Running Head'
          />
        </FormContainer>
        <FormContainer>
          <FormInput
            type='text'
            name='keywords'
            value={overviewDetails.keywords}
            onChange={handleChange}
            label='Keywords'
          />
        </FormContainer>
        <FormContainer>
          <FormInput
            type='text'
            name='identifier'
            value={overviewDetails.identifier}
            onChange={handleChange}
            label='ClinicalTrails.gov Identifier'
          />
        </FormContainer>
        <FormContainer>
          <FormInput
            type='text'
            name='sponsor'
            value={overviewDetails.sponsor}
            onChange={handleChange}
            label='Sponsor'
          />
        </FormContainer>
        <FormContainer>
          <Grid container direction='row'>
            <CheckboxContainer>
              <LabelContainer>IRB Approved?</LabelContainer>
              <Grid item xs={8}>
                IRB must approve to continue
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={check.checkedA}
                      onChange={handleCheckChange}
                      name='checkedA'
                      color='secondary'
                    />
                  }
                  label='Yes'
                />
              </Grid>
            </CheckboxContainer>
          </Grid>
        </FormContainer>
      </OverviewFormContainer>
    </Paper>
  );
};

export default OverviewForm;
