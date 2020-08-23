import React from 'react';
import { Grid } from '@material-ui/core';

import { clinicalTrialType } from './search-filters.data';

import {
  PaperContainer,
  CloseButtonContainer,
  ButtonsContainer,
  ErrorButtonContainer
} from './search-filters.styles';

import FormInput from '../form-input/form-input.component';
import FormSelect from '../form-select/form-select.component';
import PrimaryButton from '../primary-button/primary-button.component';

class SearchFilters extends React.Component {
  state = {
    author: '',
    sponsor: '',
    endpoint: '',
    translationalEndpoint: '',
    institution: '',
    disease: '',
    drugTarget: '',
    pharmacokinetics: '',
    trialNumber: '',
    drug: '',
    type: ''
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const {
      author,
      sponsor,
      endpoint,
      translationalEndpoint,
      institution,
      disease,
      drugTarget,
      pharmacokinetics,
      trialNumber,
      drug
    } = this.state;
    const { toggleSearch } = this.props;

    return (
      <PaperContainer>
        <Grid container>
          <Grid item xs={11} />
          <Grid item container justify='flex-end' alignItems='baseline' xs={1}>
            <CloseButtonContainer onClick={toggleSearch}>
              x
            </CloseButtonContainer>
          </Grid>
        </Grid>
        <Grid container direction='row' justify='flex-start'>
          <Grid item xs={4}>
            <FormInput
              type='text'
              name='author'
              value={author}
              onChange={this.handleChange}
              label='Author'
              width='150px'
            />
            <FormInput
              type='text'
              name='sponsor'
              value={sponsor}
              onChange={this.handleChange}
              label='Sponsor'
              width='150px'
            />
            <FormInput
              type='text'
              name='endpoint'
              value={endpoint}
              onChange={this.handleChange}
              label='End Point'
              width='150px'
            />
            <FormInput
              type='text'
              name='translationalEndpoint'
              value={translationalEndpoint}
              onChange={this.handleChange}
              label='Translational Endpoint'
              width='150px'
            />
          </Grid>
          <Grid item xs={4}>
            <FormInput
              type='text'
              name='institution'
              value={institution}
              onChange={this.handleChange}
              label='Institution'
              width='150px'
            />
            <FormInput
              type='text'
              name='disease'
              value={disease}
              onChange={this.handleChange}
              label='Disease'
              width='150px'
            />
            <FormInput
              type='text'
              name='drugTarget'
              value={drugTarget}
              onChange={this.handleChange}
              label='Drug Target'
              width='150px'
            />
            <FormInput
              type='text'
              name='pharmacokinetics'
              value={pharmacokinetics}
              onChange={this.handleChange}
              label='Pharmacokinetics'
              width='150px'
            />
          </Grid>
          <Grid item xs={4}>
            <FormInput
              type='text'
              name='trialNumber'
              value={trialNumber}
              onChange={this.handleChange}
              label='Trail Number'
              width='150px'
            />
            <FormInput
              type='text'
              name='drug'
              value={drug}
              onChange={this.handleChange}
              label='Drug'
              width='150px'
            />
            <FormSelect label='Type of Clinical Trial' width='150px'>
              {clinicalTrialType.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </FormSelect>
          </Grid>
          <Grid container direction='row' justify='flex-end'>
            <Grid item xs={8} />
            <Grid item xs={4}>
              <ButtonsContainer>
                <ErrorButtonContainer>Cancel</ErrorButtonContainer>
                <PrimaryButton>Search</PrimaryButton>
              </ButtonsContainer>
            </Grid>
          </Grid>
        </Grid>
      </PaperContainer>
    );
  }
}

export default SearchFilters;
