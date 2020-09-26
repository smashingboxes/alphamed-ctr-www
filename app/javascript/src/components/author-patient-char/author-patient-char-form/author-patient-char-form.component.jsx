import React from 'react';
import validator from 'validator';
import { Grid, Paper } from '@material-ui/core';

import {
  ButtonContainer
} from './author-patient-char-form.styles'

import {
  GenericHeaderContainer,
  GenericFieldContainer,
  GenericFormContainer,
  GenericLabelContainer
} from '../../shared/form-container/form-container.styles';

import CTRCustomTab from '../../shared/ctr-custom-tab/ctr-custom-tab.component';
import CTRCustomFieldForm from '../../shared/ctr-custom-field-form/ctr-custom-field-form.component';
import CTRSelect from '../../shared/ctr-select/ctr-select.component';
import CTRInput from '../../shared/ctr-input/ctr-input.component';
import CTRComments from '../../shared/ctr-comments/ctr-comments.component';
import FormEditor from '../../shared/form-editor/form-editor.component';
import SecondaryButton from '../../shared/secondary-button/secondary-button.component';
import CTRCustomInputPill from '../../shared/ctr-custom-input-pill/ctr-custom-input-pill.component';
import CTRFormContainer from '../../shared/ctr-form-container/ctr-form-container.component';
import CTRSpacer from '../../shared/ctr-spacer/ctr-spacer.component';

class AuthorPatientCharForm extends React.Component {

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
        Patient Characteristics
        </GenericHeaderContainer>
        <CTRCustomTab
        label = {"Phase"}
        initialValue = "Phase 1"
        />
         <CTRCustomTab
        label = {"Arms"}
        isAppendable = {true}
        appendLabel = "Arm"
        onTabAdd = { ({value, isSelected}) => { console.log(value)}}
        onTabSelectChange = { ({value, isSelected}, index) => {console.log(index)}}
        onTabItemRemoved = { ({value, isSelected}, index) => {console.log(value)}}
        />
        <form onSubmit={this.handleSubmit}>
          <GenericFormContainer>

          <CTRFormContainer
            label = "Number of Patients"
          >
            <CTRCustomInputPill
              label = "Male"
              width = {250}
            />
            <CTRSpacer/>
            <CTRCustomInputPill
              label = "Female"
              width = {250}
            />
          </CTRFormContainer>

            <GenericFieldContainer>
              <FormEditor
                  require={true}
                  label='Stage'
                  setData={(value) => {}}
                />
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRInput
                type='text'
                name='workingName'
                require={false}
                onChange={this.handleChange}
                label='Age: Median (range)'
              />
            </GenericFieldContainer>

            <GenericFieldContainer>
                <CTRInput
                  type='text'
                  name='tradeName'
                  require={false}
                  onChange={this.handleChange}
                  label='Number of prior systemic therapies: Median (range)'
                />
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRSpacer top = {50}/>
              <CTRCustomInputPill
                label = "0"
                width = {250}
              />
              <CTRCustomInputPill
                label = "1"
                width = {250}
              />
              <CTRCustomInputPill
                label = "2"
                width = {250}
              />
              <CTRCustomInputPill
                label = "3"
                width = {250}
              />
              <CTRCustomInputPill
                label = "Unknown"
                width = {250}
              />
              <CTRSpacer bottom = {50} />
            </GenericFieldContainer>

            <GenericFieldContainer>
                <FormEditor
                    require={true}
                    label='Other'
                    setData={(value) => {}}
                  />
            </GenericFieldContainer>

            <CTRCustomFieldForm
               heading = "Cancer Types or Histologic Subtypes"
               headers = {["Name", "Number"]}
            />

          </GenericFormContainer>

          <CTRComments/>

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

export default AuthorPatientCharForm;
