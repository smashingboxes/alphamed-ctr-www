import React from 'react';
import validator from 'validator';
import { Grid, Paper, Checkbox, FormControlLabel } from '@material-ui/core';

import {
  OverviewContainer,
  OverviewFormContainer,
  FormContainer,
  CheckboxContainer,
  LabelContainer,
  ButtonContainer,
  GridContainer
} from './overview-form.styles';

import { typeOfStudyData } from './overview-form.data';

import { swalMessage } from '../../shared/swal-message/swal-message';
import FormEditor from '../../shared/form-editor/form-editor.component';
import CTRInput from '../../shared/ctr-input/ctr-input.component';
import CTRSelect from '../../shared/ctr-select/ctr-select.component';
import SecondaryButton from '../../shared/secondary-button/secondary-button.component';
import CTRComments from '../../shared/ctr-comments/ctr-comments.component';

class OverviewForm extends React.Component {
  state = {
    id: '',
    typeOfStudy: 'Phase I',
    title: '',
    runningHead: '',
    keywords: '',
    identifier: '',
    sponsor: '',
    resultCount: 0,
    typeOfStudyError: '',
    titleError: '',
    runningHeadError: '',
    keywordsError: '',
    identifierError: '',
    sponsorError: '',
    checked: false,
    isEdit: false
  };

  componentDidMount() {
    const { ctrResult } = this.props;

    if (ctrResult === null) return;
    if (ctrResult.length === 0) return;

    const {
      study_phase,
      title,
      running_head,
      key_words,
      identifier,
      irb_approved,
      sponsor,
      result_count,
      _id
    } = ctrResult[0];

    return this.setState({
      typeOfStudy: study_phase,
      title,
      runningHead: running_head,
      keywords: key_words,
      identifier,
      checked: irb_approved,
      sponsor,
      isEdit: true,
      resultCount:
        result_count === null || result_count <= 0 ? 1 : result_count,
      id: _id.$oid
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      typeOfStudy,
      title,
      runningHead,
      keywords,
      identifier,
      sponsor,
      checked,
      isEdit,
      resultCount,
      id
    } = this.state;

    const { createCTROverviewStart, user } = this.props;

    if (validator.isEmpty(title) || title === null) {
      this.setState({
        titleError: 'This field is mandatory.'
      });
      return;
    } else {
      if (title.match(/(\w+)/g).length > 150) {
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
      if (runningHead.match(/(\w+)/g).length > 50) {
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
      if (keywords.match(/(\w+)/g).length > 5) {
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

    if (checked === false) {
      return swalMessage(
        'Please check the IRB approved first before proceeding to next step.',
        'error'
      );
    }

    if (resultCount === 0) {
      this.setState({
        resultCount: 1
      });
    }

    return createCTROverviewStart({
      authToken: user.authentication_token,
      typeOfStudy,
      title,
      runningHead,
      keywords,
      identifier,
      sponsor,
      checked,
      isEdit,
      resultCount,
      id
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
            {user.user_type === 2 ? (
              <FormContainer>
                <FormEditor label='Section Editor Comments' />
              </FormContainer>
            ) : null}
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
                require={true}
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
                require={true}
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
                require={true}
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
                require={true}
                value={sponsor}
                onChange={this.handleChange}
                label='Sponsor'
                error={sponsorError}
              />
            </FormContainer>
            <FormContainer>
              <GridContainer container alignItems='start' spacing={1}>
                <Grid item xs={3}>
                  <LabelContainer style={{ textAlign: 'right', margin: '0px' }}>
                    IRB Approved?
                  </LabelContainer>
                </Grid>
                <Grid item xs={9}>
                  <CheckboxContainer>
                    <Grid container direction='column'>
                      <Grid item xs>
                        <LabelContainer>
                          IRB must approve to continue
                        </LabelContainer>
                      </Grid>
                      <Grid item xs>
                        <FormControlLabel
                          style={{ color: '#58285f' }}
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
                    </Grid>
                  </CheckboxContainer>
                </Grid>
              </GridContainer>
            </FormContainer>
          </OverviewFormContainer>
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

export default OverviewForm;
