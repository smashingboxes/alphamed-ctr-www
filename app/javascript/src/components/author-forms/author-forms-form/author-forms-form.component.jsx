import React from 'react';
import validator from 'validator';
import { Grid, Paper } from '@material-ui/core';

import {
  ButtonContainer
} from './author-forms-form.styles'

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

class AuthorFormsForm extends React.Component {

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
          Author forms
        </GenericHeaderContainer>

        <form onSubmit={this.handleSubmit}>
          <GenericFormContainer>
          Author forms
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

export default AuthorFormsForm;
