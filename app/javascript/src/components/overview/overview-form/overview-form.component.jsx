import React from 'react';
import validator from 'validator';
import { Grid, Paper, Checkbox, FormControlLabel } from '@material-ui/core';

import {
  OverviewContainer,
  OverviewFormContainer,
  FormContainer,
  CheckboxContainer,
  LabelContainer,
  ButtonContainer
} from './overview-form.styles';

import { typeOfStudyData } from './overview-form.data';

import FormEditor from '../../shared/form-editor/form-editor.component';
import CTRInput from '../../shared/ctr-input/ctr-input.component';
import CTRSelect from '../../shared/ctr-select/ctr-select.component';
import SecondaryButton from '../../shared/secondary-button/secondary-button.component';
import OverviewComments from '../overview-comments/overview-comments.component';

class OverviewForm extends React.Component {
  state = {
    typeOfStudy: 'Phase I',
    title: '',
    runningHead: '',
    keywords: '',
    identifier: '',
    sponsor: '',
    typeOfStudyError: '',
    titleError: '',
    runningHeadError: '',
    keywordsError: '',
    identifierError: '',
    sponsorError: '',
    checked: false
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      typeOfStudy,
      title,
      runningHead,
      keywords,
      identifier,
      sponsor,
      checked
    } = this.state;

    const { createCTROverviewStart, user } = this.props;

    if (validator.isEmpty(title)) {
      this.setState({
        titleError: 'This field is mandatory.'
      });
      return;
    } else {
      if (title.split(' ').length > 150) {
        this.setState({
          titleError: 'Must be 150 words at most.'
        });
        return;
      }
    }

    if (validator.isEmpty(runningHead)) {
      this.setState({
        runningHeadError: 'This field is mandatory.'
      });
      return;
    } else {
      if (runningHead.length > 50) {
        this.setState({
          runningHeadError: 'Must be 50 words at most.'
        });
        return;
      }
    }

    if (validator.isEmpty(keywords)) {
      this.setState({
        keywordsError: 'This field is mandatory.'
      });
      return;
    } else {
      if (keywords.split(' ').length > 5) {
        this.setState({
          keywordsError: 'Must be 5 words at most.'
        });

        return;
      }
    }

    if (validator.isEmpty(identifier)) {
      this.setState({
        identifierError: 'This field is mandatory.'
      });
      return;
    }

    if (validator.isEmpty(sponsor)) {
      this.setState({
        sponsorError: 'This field is mandatory.'
      });
      return;
    }

    return createCTROverviewStart({
      authToken: user.authentication_token,
      typeOfStudy,
      title,
      runningHead,
      keywords,
      identifier,
      sponsor,
      checked
    });
  };

  handleCheck = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      typeOfStudyError: '',
      titleError: '',
      runningHeadError: '',
      keywordsError: '',
      identifierError: '',
      sponsorError: ''
    });

    this.setState({ [name]: value });
  };

  render() {
    const { user } = this.props;
    const {
      typeOfStudy,
      title,
      runningHead,
      keywords,
      identifier,
      sponsor,
      checked,
      titleError,
      runningHeadError,
      keywordsError,
      identifierError,
      sponsorError
    } = this.state;

    return (
      <Paper elevation={0}>
        <OverviewContainer>Overview</OverviewContainer>
        <form onSubmit={this.handleSubmit}>
          <OverviewFormContainer>
            {user.user_type === 3 ? null : (
              <FormContainer>
                <FormEditor label='Section Editor Comments' />
              </FormContainer>
            )}
            <FormContainer>
              <CTRSelect
                label='Type of Study'
                require={true}
                onChange={(event) =>
                  this.setState({ typeOfStudy: event.target.value })
                }
                value={typeOfStudy}
              >
                {typeOfStudyData.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </CTRSelect>
            </FormContainer>
            <FormContainer>
              <CTRInput
                type='text'
                name='title'
                require={true}
                value={title}
                onChange={this.handleChange}
                label='Title'
                error={titleError}
              />
            </FormContainer>
            <FormContainer>
              <CTRInput
                type='text'
                name='runningHead'
                value={runningHead}
                onChange={this.handleChange}
                label='Running Head'
                error={runningHeadError}
              />
            </FormContainer>
            <FormContainer>
              <CTRInput
                type='text'
                name='keywords'
                value={keywords}
                onChange={this.handleChange}
                label='Keywords'
                error={keywordsError}
              />
            </FormContainer>
            <FormContainer>
              <CTRInput
                type='text'
                name='identifier'
                value={identifier}
                onChange={this.handleChange}
                label='ClinicalTrails.gov Identifier'
                error={identifierError}
              />
            </FormContainer>
            <FormContainer>
              <CTRInput
                type='text'
                name='sponsor'
                value={sponsor}
                onChange={this.handleChange}
                label='Sponsor'
                error={sponsorError}
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
                          checked={checked}
                          onChange={this.handleCheck}
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
          <OverviewComments />
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

export default OverviewForm;
