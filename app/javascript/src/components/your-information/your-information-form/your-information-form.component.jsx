import React from 'react';
import validator from 'validator';
import {
  Grid,
  Paper,
  Checkbox,
  FormControlLabel,
  Typography
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import {
  YourInformationContainer,
  YourInformationFormContainer,
  FormContainer,
  CheckboxContainer,
  ButtonContainer,
  InstitutionFormContainer,
  RemoveButton,
  AddButton,
  AddButtonContainer,
  SubmitterDetails
} from './your-information-form.styles';

import {
  degreeData,
  stateProvinceData,
  countryData
} from './your-information-form.data';

import CTRInput from '../../shared/ctr-input/ctr-input.component';
import CTRSelect from '../../shared/ctr-select/ctr-select.component';
import SecondaryButton from '../../shared/secondary-button/secondary-button.component';
import CTRComments from '../../shared/ctr-comments/ctr-comments.component';
import FormEditor from '../../shared/form-editor/form-editor.component';
import ErrorButton from '../../shared/error-button /error-button.component';

class YourInformationForm extends React.Component {
  state = {
    id: '',
    firstName: '',
    middleName: '',
    lastName: '',
    firstDegree: '',
    secondDegree: '',
    addressOne: '',
    addressTwo: '',
    city: '',
    stateProvince: '',
    zipCode: '',
    country: '',
    telephone: '',
    institutions: [''],
    otherInput: false,
    principalInvestigator: false,
    correspondingAuthor: false,
    submitterOnly: false,
    assisted: false,
    acknowledgements: '',
    firstNameError: '',
    middleNameError: '',
    lastNameError: '',
    firstDegreeError: '',
    secondDegreeError: '',
    addressOneError: '',
    addressTwoError: '',
    cityError: '',
    stateProvinceError: '',
    zipCodeError: '',
    countryError: '',
    telephoneError: '',
    institutionsError: '',
    acknowledgementsError: ''
  };

  componentDidMount() {
    const { ctrResult } = this.props;

    if (ctrResult === null) return;
    if (ctrResult.length === 0) return;

    const {
      author_first_name,
      author_middle_name,
      author_last_name,
      author_degrees,
      author_address_1,
      author_address_2,
      author_city,
      author_statoid,
      author_zip,
      author_country,
      author_phone,
      author_institutions,
      author_pi,
      author_ca,
      author_submitter,
      author_assisted,
      author_acknowledgements,
      _id
    } = ctrResult[0];

    if (author_degrees.first) {
      const result = degreeData.filter((data) => data === author_degrees.first);

      if (result.length <= 0) {
        this.setState({
          otherInput: true
        });
      }
    }

    return this.setState({
      id: _id.$oid,
      firstName: author_first_name === null ? '' : author_first_name,
      middleName: author_middle_name === null ? '' : author_middle_name,
      lastName: author_last_name === null ? '' : author_last_name,
      firstDegree: author_degrees.first,
      secondDegree: author_degrees.second,
      addressOne: author_address_1 === null ? '' : author_address_1,
      addressTwo: author_address_2 === null ? '' : author_address_2,
      city: author_city === null ? '' : author_city,
      stateProvince: author_statoid === null ? '' : author_statoid,
      zipCode: author_zip === null ? '' : author_zip,
      country: author_country === null ? '' : author_country,
      telephone: author_phone === null ? '' : author_phone,
      institutions:
        author_institutions.length === 0 ? [''] : author_institutions,
      principalInvestigator: author_pi === null ? false : author_pi,
      correspondingAuthor: author_ca === null ? false : author_ca,
      submitterOnly: author_submitter === null ? false : author_submitter,
      assisted: author_assisted === null ? false : author_assisted,
      acknowledgements:
        author_acknowledgements === null ? '' : author_acknowledgements
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      firstName,
      middleName,
      lastName,
      firstDegree,
      secondDegree,
      addressOne,
      addressTwo,
      city,
      stateProvince,
      zipCode,
      country,
      telephone,
      institutions,
      principalInvestigator,
      correspondingAuthor,
      submitterOnly,
      assisted,
      acknowledgements,
      id
    } = this.state;

    const { createCTRYourInformationStart, user } = this.props;

    if (validator.isEmpty(firstName)) {
      this.setState({
        firstNameError: 'This field is mandatory.'
      });
      return;
    }

    if (validator.isEmpty(lastName)) {
      this.setState({
        lastNameError: 'This field is mandatory.'
      });
      return;
    }

    if (validator.isEmpty(firstDegree)) {
      this.setState({
        firstDegreeError: 'This field is mandatory.'
      });
      return;
    }

    if (validator.isEmpty(addressOne)) {
      this.setState({
        addressOneError: 'This field is mandatory.'
      });
      return;
    }

    if (validator.isEmpty(city)) {
      this.setState({
        cityError: 'This field is mandatory.'
      });
      return;
    }

    if (validator.isEmpty(stateProvince)) {
      this.setState({
        stateProvinceError: 'This field is mandatory.'
      });
      return;
    }

    if (validator.isEmpty(zipCode)) {
      this.setState({
        zipCodeError: 'This field is mandatory.'
      });
      return;
    }

    if (validator.isEmpty(country)) {
      this.setState({
        countryError: 'This field is mandatory.'
      });
      return;
    }

    if (validator.isEmpty(zipCode)) {
      this.setState({
        zipCodeError: 'This field is mandatory.'
      });
      return;
    }

    if (validator.isEmpty(telephone)) {
      this.setState({
        telephoneError: 'This field is mandatory.'
      });
      return;
    }

    if (institutions.length === 0 || institutions[0] === '') {
      this.setState({
        institutionsError: 'This field is mandatory.'
      });
      return;
    }

    let fullName = firstName + ' ' + middleName;

    return createCTRYourInformationStart({
      authToken: user.authentication_token,
      firstName,
      middleName,
      fullName,
      lastName,
      firstDegree,
      secondDegree,
      addressOne,
      addressTwo,
      city,
      stateProvince,
      zipCode,
      country,
      telephone,
      institutions,
      principalInvestigator,
      correspondingAuthor,
      submitterOnly,
      assisted,
      acknowledgements,
      id
    });
  };

  handleCheckPrincipalInvestigator = () => {
    this.setState({
      principalInvestigator: !this.state.principalInvestigator
    });
  };

  handleCheckCorrespondingAuthor = () => {
    this.setState({
      correspondingAuthor: !this.state.correspondingAuthor
    });
  };

  handleCheckSubmitterOnly = () => {
    this.setState({
      submitterOnly: !this.state.submitterOnly
    });
  };

  handleCheckAssisted = () => {
    this.setState({
      assisted: !this.state.assisted
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      firstNameError: '',
      middleNameError: '',
      lastNameError: '',
      firstDegreeError: '',
      secondDegreeError: '',
      addressOneError: '',
      addressTwoError: '',
      cityError: '',
      stateProvinceError: '',
      zipCodeError: '',
      countryError: '',
      telephoneError: '',
      institutionsError: '',
      acknowledgementsError: ''
    });

    this.setState({ [name]: value });
  };

  addInstitutionField = () => {
    this.setState({ institutions: [...this.state.institutions, ''] });
  };

  removeInstitutionField = (index) => {
    if (this.state.institutions.length <= 1) {
      return;
    }

    this.state.institutions.splice(index, 1);

    return this.setState({ institutions: this.state.institutions });
  };

  handleChangeInstitution = (e, index) => {
    this.state.institutions[index] = e.target.value;
    this.setState({
      institutions: this.state.institutions,
      institutionsError: ''
    });
  };

  handlePrevious = () =>
    (window.location.href = `/submission/results/${this.state.id}`);

  render() {
    const {
      firstName,
      middleName,
      lastName,
      firstDegree,
      secondDegree,
      addressOne,
      addressTwo,
      city,
      stateProvince,
      zipCode,
      country,
      telephone,
      institutions,
      otherInput,
      acknowledgements,
      principalInvestigator,
      correspondingAuthor,
      submitterOnly,
      assisted,
      firstNameError,
      middleNameError,
      lastNameError,
      firstDegreeError,
      secondDegreeError,
      addressOneError,
      addressTwoError,
      cityError,
      stateProvinceError,
      zipCodeError,
      countryError,
      telephoneError,
      institutionsError
    } = this.state;

    return (
      <Paper elevation={0}>
        <YourInformationContainer>Your Information</YourInformationContainer>
        <form onSubmit={this.handleSubmit}>
          <YourInformationFormContainer>
            <FormContainer>
              <CTRInput
                type='text'
                name='firstName'
                require={true}
                value={firstName}
                onChange={this.handleChange}
                label='First Name'
                error={firstNameError}
              />
            </FormContainer>
            <FormContainer>
              <CTRInput
                type='text'
                name='middleName'
                require={false}
                value={middleName}
                onChange={this.handleChange}
                label='Middle Name'
                error={middleNameError}
              />
            </FormContainer>
            <FormContainer>
              <CTRInput
                type='text'
                name='lastName'
                require={true}
                value={lastName}
                onChange={this.handleChange}
                label='Last Name'
                error={lastNameError}
              />
            </FormContainer>
            <FormContainer>
              <CTRSelect
                label='First Degree'
                require={otherInput ? false : true}
                onChange={(event) => {
                  if (event.target.value === 'Other') {
                    return this.setState({
                      firstDegree: '',
                      firstDegreeError: '',
                      otherInput: true
                    });
                  }

                  return this.setState({
                    firstDegree: event.target.value,
                    firstDegreeError: '',
                    otherInput: false
                  });
                }}
                value={otherInput ? 'Other' : firstDegree}
                error={otherInput ? '' : firstDegreeError}
              >
                {degreeData.map((degree) => (
                  <option key={degree} value={degree}>
                    {degree}
                  </option>
                ))}
              </CTRSelect>
            </FormContainer>
            {otherInput ? (
              <FormContainer>
                <CTRInput
                  type='text'
                  name='firstDegree'
                  require={otherInput ? true : false}
                  value={otherInput ? firstDegree : ''}
                  onChange={this.handleChange}
                  label='First Degree'
                  error={otherInput ? firstDegreeError : ''}
                />
              </FormContainer>
            ) : null}
            <FormContainer>
              <CTRInput
                type='text'
                name='secondDegree'
                require={false}
                value={secondDegree}
                onChange={this.handleChange}
                label='Second Degree'
                error={secondDegreeError}
              />
            </FormContainer>
          </YourInformationFormContainer>
          <YourInformationContainer>
            Contact Information
          </YourInformationContainer>
          <YourInformationFormContainer>
            <FormContainer>
              <CTRInput
                type='text'
                name='addressOne'
                require={true}
                value={addressOne}
                onChange={this.handleChange}
                label='Address Line 1'
                error={addressOneError}
              />
            </FormContainer>
            <FormContainer>
              <CTRInput
                type='text'
                name='addressTwo'
                require={false}
                value={addressTwo}
                onChange={this.handleChange}
                label='Address Line 2'
                error={addressTwoError}
              />
            </FormContainer>
            <FormContainer>
              <CTRInput
                type='text'
                name='city'
                require={true}
                value={city}
                onChange={this.handleChange}
                label='City'
                error={cityError}
              />
            </FormContainer>
            <FormContainer>
              <CTRSelect
                label='State/Province'
                require={true}
                onChange={(event) =>
                  this.setState({
                    stateProvince: event.target.value,
                    stateProvinceError: ''
                  })
                }
                value={stateProvince}
                error={stateProvinceError}
              >
                {stateProvinceData.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </CTRSelect>
            </FormContainer>
            <FormContainer>
              <CTRInput
                type='text'
                name='zipCode'
                require={true}
                value={zipCode}
                onChange={this.handleChange}
                label='Zip/Postal Code'
                error={zipCodeError}
              />
            </FormContainer>
            <FormContainer>
              <CTRSelect
                label='Country'
                require={true}
                onChange={(event) =>
                  this.setState({
                    country: event.target.value,
                    countryError: ''
                  })
                }
                value={country}
                error={countryError}
              >
                {countryData.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </CTRSelect>
            </FormContainer>
            <FormContainer>
              <CTRInput
                type='text'
                name='telephone'
                require={true}
                value={telephone}
                onChange={this.handleChange}
                label='Phone'
                error={telephoneError}
              />
            </FormContainer>
          </YourInformationFormContainer>
          <YourInformationContainer>
            Additional Information
          </YourInformationContainer>
          <YourInformationFormContainer>
            {institutions.map((institution, index) => (
              <InstitutionFormContainer>
                <FormContainer key={index}>
                  <CTRInput
                    type='text'
                    name={`institution-${index}`}
                    require={index === 0 ? true : false}
                    display={index === 0 ? false : true}
                    value={institution}
                    onChange={(e) => this.handleChangeInstitution(e, index)}
                    label={
                      index === 0
                        ? 'Department, Institution and Location'
                        : 'Department, Institution and Location*'
                    }
                    error={institutionsError}
                  />
                </FormContainer>
                <RemoveButton
                  onClick={() => this.removeInstitutionField(index)}
                  aria-label='delete'
                  size='small'
                >
                  <RemoveIcon fontSize='small' />
                </RemoveButton>
              </InstitutionFormContainer>
            ))}
            <AddButtonContainer onClick={this.addInstitutionField}>
              <AddButton>
                <AddIcon fontSize='small' />
              </AddButton>
              <Typography color='primary'>Add another institution</Typography>
            </AddButtonContainer>
          </YourInformationFormContainer>
          <CheckboxContainer>
            <Grid item xs={8}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={principalInvestigator}
                    onChange={this.handleCheckPrincipalInvestigator}
                    name='principalInvestigator'
                    color='secondary'
                  />
                }
                label='Principle investigator?'
                color='primary'
              />
            </Grid>
          </CheckboxContainer>
          <CheckboxContainer>
            <Grid item xs={8}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={correspondingAuthor}
                    onChange={this.handleCheckCorrespondingAuthor}
                    name='correspondingAuthor'
                    color='secondary'
                  />
                }
                label='Corresponding author?'
              />
            </Grid>
          </CheckboxContainer>
          <CheckboxContainer>
            <Grid item xs={8}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={submitterOnly}
                    onChange={this.handleCheckSubmitterOnly}
                    name='submitterOnly'
                    color='secondary'
                  />
                }
                label='Are you the submitter?'
              />
            </Grid>
            <Grid item xs={8}>
              <SubmitterDetails>
                By clicking this box you are indicating that you are not an
                author on this paper
              </SubmitterDetails>
            </Grid>
          </CheckboxContainer>
          <CheckboxContainer>
            <Grid item xs={8}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={assisted}
                    onChange={this.handleCheckAssisted}
                    name='assisted'
                    color='secondary'
                  />
                }
                label='Were the authors assisted by a professional medical writer or editor in the preparation of this submission?'
              />
            </Grid>
          </CheckboxContainer>
          <YourInformationFormContainer>
            <FormContainer>
              <FormEditor
                require={false}
                label='Acknowledgements'
                data={acknowledgements}
                setData={(value) => this.setState({ acknowledgements: value })}
              />
            </FormContainer>
          </YourInformationFormContainer>
          <CTRComments />
          <Grid container justify='center' alignItems='center'>
            <ButtonContainer>
              <ErrorButton type='button' onClick={this.handlePrevious}>Previous</ErrorButton>
            </ButtonContainer>
            <ButtonContainer>
              <SecondaryButton type='submit'>Save</SecondaryButton>
            </ButtonContainer>
          </Grid>
        </form>
      </Paper>
    );
  }
}

export default YourInformationForm;
