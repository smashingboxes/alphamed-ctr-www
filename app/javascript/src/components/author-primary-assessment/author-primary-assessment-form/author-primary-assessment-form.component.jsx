import React from 'react';
import validator from 'validator';
import { Grid, Paper } from '@material-ui/core';

import {
  ButtonContainer
} from './author-primary-assessment-form.styles'

import {
  FormSelectContainer,
} from '../../shared/ctr-select/ctr-select.styles';

import {
  GenericHeaderContainer,
  GenericFieldContainer,
  GenericFormContainer,
  GenericLabelContainer
} from '../../shared/form-container/form-container.styles';

import CTRCustomTab from '../../shared/ctr-custom-tab/ctr-custom-tab.component';
import CTRSelect from '../../shared/ctr-select/ctr-select.component';
import CTRInput from '../../shared/ctr-input/ctr-input.component';
import CTRComments from '../../shared/ctr-comments/ctr-comments.component';
import FormEditor from '../../shared/form-editor/form-editor.component';
import SecondaryButton from '../../shared/secondary-button/secondary-button.component';
import CTRCustomInputPill from '../../shared/ctr-custom-input-pill/ctr-custom-input-pill.component';
import CTRFormContainer from '../../shared/ctr-form-container/ctr-form-container.component';
import CTRSpacer from '../../shared/ctr-spacer/ctr-spacer.component';

class AuthorPrimaryAssessmentForm extends React.Component {

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
        Primary Assessment Method
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
        label = {"Order"}
        isAppendable = {true}
        initialValue = "Primary"
        appendLabel = "Secondary Assessment Methods"
        />
        <CTRCustomTab
        label = {"Assessments"}
        isAppendable = {true}
        initialValue = "New Assessment"
        appendLabel = "Assessment"
        />

        <form onSubmit={this.handleSubmit}>
          <GenericFormContainer>

          <GenericFieldContainer>
              <CTRInput
                type='text'
                name='workingName'
                require={false}
                onChange={this.handleChange}
                label='Title'
              />
          </GenericFieldContainer>

          <CTRFormContainer
            label = "Number of Patients"
          >
            <CTRCustomInputPill
                label = "Screened"
                width = {400}
            />
            <CTRCustomInputPill
                label = "Enrolled"
                width = {400}
            />
            <CTRCustomInputPill
                label = "Evaluable for Toxicity"
                width = {400}
            />
            <CTRCustomInputPill
                label = "Evaluable for Efficacy"
                width = {400}
            />
          </CTRFormContainer>

          <GenericFieldContainer>
            <CTRSelect
                label='Evaluation Method'
                require={true}
                onChange={(event) => {}}
              >
                <option key={2}>
                   Test
                </option>
            </CTRSelect>
            </GenericFieldContainer>

          <CTRSpacer top = {50} />

          <Grid container justify = "center">
            <Grid item md>
              <CTRCustomInputPill
                  label = "CR"
                  width = {300}
                  placeHolder = "N="
              />
              <CTRCustomInputPill
                  label = "PR"
                  width = {300}
                  placeHolder = "N="
              />
              <CTRCustomInputPill
                  label = "SD"
                  width = {300}
                  placeHolder = "N="
              />
              <CTRCustomInputPill
                  label = "PD"
                  width = {300}
                  placeHolder = "N="
              />
              <CTRCustomInputPill
                  label = "Other"
                  width = {300}
                  placeHolder = "N="
              />
            </Grid>
            <Grid item md>
            <CTRCustomInputPill
                  label = "%"
                  width = {180}
              />
              <CTRCustomInputPill
                  label = "%"
                  width = {180}
              />
              <CTRCustomInputPill
                  label = "%"
                  width = {180}
              />
              <CTRCustomInputPill
                  label = "%"
                  width = {180}
              />
              <CTRCustomInputPill
                  label = "%"
                  width = {180}
              />
            </Grid>
          </Grid>

          <CTRSpacer top = {30} />

          <Grid container>
            <Grid item xs>
              <CTRCustomInputPill
                  label = "PES"
                  width = {400}
              />
              <CTRCustomInputPill
                  label = "TTP"
                  width = {400}
              />
              <CTRCustomInputPill
                  label = "OS"
                  width = {400}
              />
              <CTRCustomInputPill
                  label = "Response Duration"
                  width = {400}
              />
              <CTRCustomInputPill
                  label = "Duration of Treatmeant"
                  width = {400}
              />
            </Grid>
            <Grid item xs>
              <FormSelectContainer width={500}>
                <option key={2}>
                   Test
                </option>
              </FormSelectContainer>
              <FormSelectContainer style = {{ display: "block" }} width={200}>
              <option key={2}>
                   Test
                </option>
              </FormSelectContainer>
              <FormSelectContainer style = {{ display: "block" }} width={200}>
              <option key={2}>
                   Test
                </option>
              </FormSelectContainer>
              <FormSelectContainer style = {{ display: "block" }} width={200}>
              <option key={2}>
                   Test
                </option>
              </FormSelectContainer>
              <FormSelectContainer style = {{ display: "block" }} width={200}>
              <option key={2}>
                   Test
                </option>
              </FormSelectContainer>
            </Grid>
            <Grid item xs>
              <CTRCustomInputPill
                  label = "CI"
                  width = {200}
              />
              <CTRCustomInputPill
                  label = "CI"
                  width = {200}
              />
              <CTRCustomInputPill
                  label = "CI"
                  width = {200}
              />
            </Grid>
          </Grid>

          <GenericFieldContainer>
            <FormEditor
              require={true}
              label='Outcome Notes'
              setData={(value) => {}}
            />
          </GenericFieldContainer>

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

export default AuthorPrimaryAssessmentForm;
