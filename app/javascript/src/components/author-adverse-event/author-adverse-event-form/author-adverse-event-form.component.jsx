import React from 'react';
import validator from 'validator';
import { Grid, Paper, FormControlLabel, Checkbox, } from '@material-ui/core';

import {
  ButtonContainer
} from './author-adverse-event-form.styles'

import {
  GenericHeaderContainer,
  GenericFieldContainer,
  GenericFormContainer,
  GenericLabelContainer
} from '../../shared/form-container/form-container.styles';

import CTRSelect from '../../shared/ctr-select/ctr-select.component';
import CTRInput from '../../shared/ctr-input/ctr-input.component';
import CTRComments from '../../shared/ctr-comments/ctr-comments.component';
import FormEditor from '../../shared/form-editor/form-editor.component';
import SecondaryButton from '../../shared/secondary-button/secondary-button.component';
import CTRCustomTab from '../../shared/ctr-custom-tab/ctr-custom-tab.component';
import CTRCustomDoseTable from '../../shared/ctr-custom-dose-table/ctr-custom-dose-table.component';
import CTRFormContainer from '../../shared/ctr-form-container/ctr-form-container.component';

class AuthorAdverseEventForm extends React.Component {

  componentDidMount() {
    const { ctrResult } = this.props;
  }

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleChange = (event) => {
    const { name, value } = event.target;
  };

  render() {

    return (
      <Paper elevation={0}>
        <GenericHeaderContainer>
        Adverse Events
        </GenericHeaderContainer>

        <CTRCustomTab
        label = {"Phase"}
        initialValue = "Phase 1"
        />
         <CTRCustomTab
        label = {"Arms"}
        isAppendable = {true}
        appendLabel = "Arm"
        initialValue = "Control"
        />
        <CTRCustomTab
        label = {"Tablets"}
        isAppendable = {true}
        appendLabel = "Tablet"
        />

        <form onSubmit={this.handleSubmit}>
          <GenericFormContainer>
          <GenericFieldContainer>
            <CTRSelect
                label='Title'
                require={false}
                onChange={(event) => {}}
              >
                <option key={2}>
                   Test
                </option>
            </CTRSelect>
            </GenericFieldContainer>

            <GenericFieldContainer>
            <CTRSelect
                label='Version'
                require={false}
                onChange={(event) => {}}
              >
                <option key={2}>
                   Test
                </option>
            </CTRSelect>
            </GenericFieldContainer>

            <GenericFieldContainer>
            <CTRSelect
                label='Number of Patients or Cycles'
                require={false}
                onChange={(event) => {}}
              >
                <option key={2}>
                   Test
                </option>
            </CTRSelect>
            </GenericFieldContainer>

            <GenericFieldContainer>
            <CTRSelect
                label='Add Adverse Events'
                require={false}
                onChange={(event) => {}}
              >
                <option key={2}>
                   Test
                </option>
            </CTRSelect>
            </GenericFieldContainer>

            <GenericFieldContainer>
              <FormEditor
                  require={true}
                  label='Adverse Events Legend'
                  setData={(value) => {}}
                />
            </GenericFieldContainer>


            <CTRCustomDoseTable
                heading = "Dose Limiting Toxicities"
                headers =  {["Dose level", "Number Enrolled", "Number with a Dose Limiting Toxicity", "Dose Limiting Toxicity Information"]}
            >
              <span>Do you have any serious adverse events?</span>
             <FormControlLabel
                control={
                  <Checkbox
                    name=''
                    color='secondary'
                  />
                }
                label='Yes'
                color='primary'
              />
            </CTRCustomDoseTable>

          </GenericFormContainer>
          <CTRComments />
          <Grid container justify='center' alignItems='center'>
            <ButtonContainer>
              <SecondaryButton type='submit'>Save</SecondaryButton>
            </ButtonContainer>
          </Grid>
        </form>
      </Paper>
    );
  }
}

export default AuthorAdverseEventForm;
