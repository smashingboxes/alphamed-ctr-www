import React from 'react';
import validator from 'validator';
import { Grid, Paper, Typography } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import {
  RemoveButton,
  AddButton,
  AddButtonContainer,
  EndPointFormContainer,
  TrailInformationFormContainer,
  FormContainer,
  ButtonContainer,
  FormSelectLabel,
  FormSelectLabelSmall
} from './trial-information-form.styles';

import {
  stageOfDiseaseData,
  priorTherapyData,
  typeOfStudy2Phase1Data,
  typeOfStudy2Phase2And3Data,
  primaryAndSecondaryEndPointPhase1Data,
  primaryAndSecondaryEndPointPhase2or3Data,
  investigatorsAssessmentData
} from './trial-information-form.data';

import CTRSelect from '../../shared/ctr-select/ctr-select.component';
import CTRComments from '../../shared/ctr-comments/ctr-comments.container';
import FormEditor from '../../shared/form-editor/form-editor.component';
import SecondaryButton from '../../shared/secondary-button/secondary-button.component';
import DiseaseComboBox from '../disease-combobox/disease-combobox.component';
import { GenericFormHeaderContainer } from '../../shared/styles/shared-styles';
import ErrorButton from '../../shared/error-button/error-button.component';
import CTRInput from '../../shared/ctr-input/ctr-input.component';

class TrailInformationForm extends React.Component {
  state = {
    id: '',
    diseases: [],
    retrievedDiseases: [],
    stageOfDisease: '',
    priorTherapy: '',
    typeOfStudy2: '',
    primaryEndpoints: [''],
    secondaryEndpoints: [''],
    additionalDetails: '',
    investigatorsAssessment: '',
    otherInvestigatorsAssessment: false,
    typeOfStudy2ComboBoxData: [],
    primaryEndpointsComboBoxData: [],
    secondaryEndpointsComboBoxData: [],
    resultCount: 0,
    diseasesError: '',
    stageOfDiseaseError: '',
    priorTherapyError: '',
    typeOfStudy2Error: '',
    additionalDetailsError: '',
    investigatorsAssessmentError: ''
  };

  componentDidMount() {
    const { ctrResult } = this.props;

    if (ctrResult === null) return;
    if (ctrResult.length === 0) return;

    const {
      diseases,
      stage_of_disease_or_treatment,
      prior_therapy,
      type_of_study_2,
      primary_endpoints,
      secondary_endpoints,
      investigators_assessment,
      endpoints_details,
      study_phase,
      result_count,
      _id
    } = ctrResult[0];

    if (investigators_assessment) {
      const result = investigatorsAssessmentData.filter(
        (data) => data === investigators_assessment
      );

      if (result.length <= 0) {
        this.setState({
          otherInvestigatorsAssessment: true
        });
      }
    }

    if (study_phase === 'Phase I') {
      this.setState({
        typeOfStudy2ComboBoxData: typeOfStudy2Phase1Data,
        primaryEndpointsComboBoxData: primaryAndSecondaryEndPointPhase1Data,
        secondaryEndpointsComboBoxData: primaryAndSecondaryEndPointPhase1Data
      });
    }

    if (study_phase === 'Phase II' || study_phase === 'Phase III') {
      this.setState({
        typeOfStudy2ComboBoxData: typeOfStudy2Phase2And3Data,
        primaryEndpointsComboBoxData: primaryAndSecondaryEndPointPhase2or3Data,
        secondaryEndpointsComboBoxData: primaryAndSecondaryEndPointPhase2or3Data
      });
    }

    return this.setState({
      id: _id.$oid,
      retrievedDiseases:
        diseases === null || diseases.length === 0 ? [] : diseases,
      diseases: diseases === null || diseases.length === 0 ? [] : diseases,
      stageOfDisease:
        stage_of_disease_or_treatment === null
          ? ''
          : stage_of_disease_or_treatment,
      priorTherapy: prior_therapy === null ? '' : prior_therapy,
      typeOfStudy2: type_of_study_2 === null ? '' : type_of_study_2,
      primaryEndpoints:
        primary_endpoints.length === 0 ? [''] : primary_endpoints,
      secondaryEndpoints:
        secondary_endpoints.length === 0 ? [''] : secondary_endpoints,
      additionalDetails: endpoints_details === null ? '' : endpoints_details,
      investigatorsAssessment:
        investigators_assessment === null ? '' : investigators_assessment,
      resultCount: result_count === null || result_count <= 4 ? 5 : result_count
    });
  }

  addPrimaryEndPointField = () => {
    this.setState({ primaryEndpoints: [...this.state.primaryEndpoints, ''] });
  };

  removePrimaryEndPointField = (index) => {
    if (this.state.primaryEndpoints.length <= 1) {
      return;
    }

    this.state.primaryEndpoints.splice(index, 1);

    return this.setState({ primaryEndpoints: this.state.primaryEndpoints });
  };

  handleChangePrimaryEndpoint = (e, index) => {
    /* eslint-disable react/no-direct-mutation-state */
    this.state.primaryEndpoints[index] = e.target.value;

    this.setState({
      primaryEndpoints: this.state.primaryEndpoints
    });
  };

  addSecondaryEndPointField = () => {
    this.setState({
      secondaryEndpoints: [...this.state.secondaryEndpoints, '']
    });
  };

  removeSecondaryEndPointField = (index) => {
    if (this.state.secondaryEndpoints.length <= 1) {
      return;
    }

    this.state.secondaryEndpoints.splice(index, 1);

    return this.setState({ secondaryEndpoints: this.state.secondaryEndpoints });
  };

  handleChangeSecondaryEndpoint = (e, index) => {
    this.state.secondaryEndpoints[index] = e.target.value;
    this.setState({
      secondaryEndpoints: this.state.secondaryEndpoints
    });
  };

  changeDiseaseError = () => this.setState({ diseasesError: '' });

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      id,
      diseases,
      stageOfDisease,
      priorTherapy,
      typeOfStudy2,
      primaryEndpoints,
      secondaryEndpoints,
      additionalDetails,
      investigatorsAssessment,
      resultCount
    } = this.state;

    const { createCTRTrailInformationStart, user } = this.props;

    if (diseases.length === 0) {
      this.setState({
        diseasesError: 'This field is mandatory.'
      });
      return;
    }

    if (validator.isEmpty(stageOfDisease)) {
      this.setState({
        stageOfDiseaseError: 'This field is mandatory.'
      });
      return;
    }

    if (validator.isEmpty(priorTherapy)) {
      this.setState({
        priorTherapyError: 'This field is mandatory.'
      });
      return;
    }

    if (validator.isEmpty(typeOfStudy2)) {
      this.setState({
        typeOfStudy2Error: 'This field is mandatory.'
      });
      return;
    }

    return createCTRTrailInformationStart({
      authToken: user.authentication_token,
      diseases,
      stageOfDisease,
      priorTherapy,
      typeOfStudy2,
      primaryEndpoints,
      secondaryEndpoints,
      additionalDetails,
      investigatorsAssessment,
      resultCount,
      id
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      diseasesError: '',
      stageOfDiseaseError: '',
      priorTherapyError: '',
      typeOfStudy2Error: '',
      additionalDetailsError: '',
      investigatorsAssessmentError: ''
    });

    this.setState({ [name]: value });
  };

  onDiseaseAdd = (newDisease) => {
    this.setState(
      (prevState) => ({
        diseases: [...prevState.diseases, newDisease]
      }),
      () => console.log(this.state.diseases)
    );
  };

  onDiseaseRemove = (removeDisease) => {
    this.setState(
      {
        diseases: this.state.diseases.filter((data) => data !== removeDisease)
      },
      () => console.log(this.state.diseases)
    );
  };

  handlePrevious = () =>
    (window.location.href = `/submission/results/author-summary-abstract/${this.state.id}`);

  render() {
    const {
      id,
      stageOfDisease,
      retrievedDiseases,
      priorTherapy,
      typeOfStudy2,
      additionalDetails,
      investigatorsAssessment,
      typeOfStudy2ComboBoxData,
      primaryEndpointsComboBoxData,
      secondaryEndpointsComboBoxData,
      otherInvestigatorsAssessment,
      diseasesError,
      stageOfDiseaseError,
      priorTherapyError,
      typeOfStudy2Error,
      additionalDetailsError
    } = this.state;

    return (
      <Paper elevation={0}>
        <GenericFormHeaderContainer>
          Clinical Trial Information
        </GenericFormHeaderContainer>
        <form onSubmit={this.handleSubmit}>
          <TrailInformationFormContainer>
            <FormContainer>
              <DiseaseComboBox
                name='diseases'
                diseases={retrievedDiseases}
                onDiseaseAdd={this.onDiseaseAdd}
                onDiseaseRemove={this.onDiseaseRemove}
                error={diseasesError}
                handleError={this.changeDiseaseError}
              />
            </FormContainer>

            <FormContainer>
              <CTRSelect
                label='Stage of disease / treatment'
                require={true}
                onChange={this.handleChange}
                name='stageOfDisease'
                value={stageOfDisease}
                error={stageOfDiseaseError}
              >
                {stageOfDiseaseData.map((stage, key) => (
                  <option key={key}>{stage}</option>
                ))}
              </CTRSelect>
            </FormContainer>

            <FormContainer>
              <CTRSelect
                label='Prior Therapy'
                require={true}
                onChange={this.handleChange}
                name='priorTherapy'
                value={priorTherapy}
                error={priorTherapyError}
              >
                {priorTherapyData.map((prior, key) => (
                  <option key={key}>{prior}</option>
                ))}
              </CTRSelect>
            </FormContainer>

            <FormContainer>
              <CTRSelect
                label='Type of study - 2'
                require={true}
                onChange={this.handleChange}
                name='typeOfStudy2'
                value={typeOfStudy2}
                error={typeOfStudy2Error}
              >
                {typeOfStudy2ComboBoxData.map((stage, key) => (
                  <option key={key}>{stage}</option>
                ))}
              </CTRSelect>
            </FormContainer>

            {primaryEndpointsComboBoxData.map((primaryEndpoint, index) => (
              <EndPointFormContainer key={index}>
                <FormContainer>
                  <CTRSelect
                    require={false}
                    onChange={(e) => this.handleChangePrimaryEndpoint(e, index)}
                    name={`primary-endpoint-${index}`}
                    value={primaryEndpoint}
                    label={
                      index === 0
                        ? 'Primary Endpoint(s)'
                        : 'Primary Endpoint(s)'
                    }
                  >
                    {primaryEndpointsComboBoxData.map((stage, key) => (
                      <option key={key}>{stage}</option>
                    ))}
                  </CTRSelect>
                </FormContainer>
                <RemoveButton
                  onClick={() => this.removePrimaryEndPointField(index)}
                  aria-label='delete'
                  size='small'
                >
                  <RemoveIcon fontSize='small' />
                </RemoveButton>
              </EndPointFormContainer>
            ))}

            <AddButtonContainer onClick={this.addPrimaryEndPointField}>
              <AddButton>
                <AddIcon fontSize='small' />
              </AddButton>
              <Typography color='primary'>
                Add another primary endpoint
              </Typography>
            </AddButtonContainer>

            {secondaryEndpointsComboBoxData.map((secondaryEndpoint, index) => (
              <EndPointFormContainer key={index}>
                <FormContainer>
                  <CTRSelect
                    require={false}
                    onChange={(e) =>
                      this.handleChangeSecondaryEndpoint(e, index)
                    }
                    name={`secondary-endpoint-${index}`}
                    value={secondaryEndpoint}
                    label={
                      index === 0
                        ? 'Secondary Endpoint(s)'
                        : 'Secondary Endpoint(s)'
                    }
                  >
                    {secondaryEndpointsComboBoxData.map((stage, key) => (
                      <option key={key}>{stage}</option>
                    ))}
                  </CTRSelect>
                </FormContainer>
                <RemoveButton
                  onClick={() => this.removeSecondaryEndPointField(index)}
                  aria-label='delete'
                  size='small'
                >
                  <RemoveIcon fontSize='small' />
                </RemoveButton>
              </EndPointFormContainer>
            ))}

            <AddButtonContainer onClick={this.addSecondaryEndPointField}>
              <AddButton>
                <AddIcon fontSize='small' />
              </AddButton>
              <Typography color='primary'>
                Add another secondary endpoint
              </Typography>
            </AddButtonContainer>

            <FormContainer>
              <Grid
                style={{ paddingLeft: 50, margin: '50px 0px' }}
                container
                alignItems='start'
                spacing={1}
              >
                <Grid item xs={3}>
                  <FormSelectLabel>
                    Additional Details of Endpoints or Study Design:
                  </FormSelectLabel>
                </Grid>
                <Grid
                  container
                  direction='column'
                  alignItems='start'
                  justify='flex-start'
                  item
                  xs={9}
                >
                  <FormEditor
                    require={false}
                    data={additionalDetails}
                    setData={(value) =>
                      this.setState({
                        additionalDetails: value,
                        additionalDetailsError: ''
                      })
                    }
                    error={additionalDetailsError}
                  />
                  <FormSelectLabelSmall>
                    Include Endpoint Target and Power Analysis
                  </FormSelectLabelSmall>
                  <FormSelectLabelSmall>
                    Include outcome considered positive or that would meet
                    futility
                  </FormSelectLabelSmall>
                </Grid>
              </Grid>
            </FormContainer>

            <FormContainer>
              <CTRSelect
                label='Investigator’s Assessment'
                require={false}
                onChange={(event) => {
                  if (event.target.value === 'Other') {
                    return this.setState({
                      investigatorsAssessment: '',
                      investigatorsAssessmentError: '',
                      otherInvestigatorsAssessment: true
                    });
                  }

                  return this.setState({
                    investigatorsAssessment: event.target.value,
                    investigatorsAssessmentError: '',
                    otherInvestigatorsAssessment: false
                  });
                }}
                name='investigatorsAssessment'
                value={
                  otherInvestigatorsAssessment
                    ? 'Other'
                    : investigatorsAssessment
                }
              >
                {investigatorsAssessmentData.map((stage, key) => (
                  <option key={key}>{stage}</option>
                ))}
              </CTRSelect>
            </FormContainer>

            {otherInvestigatorsAssessment ? (
              <FormContainer>
                <CTRInput
                  type='text'
                  name='investigatorsAssessment'
                  require={false}
                  value={
                    otherInvestigatorsAssessment ? investigatorsAssessment : ''
                  }
                  onChange={this.handleChange}
                  label='Investigator’s Assessment'
                />
              </FormContainer>
            ) : null}
          </TrailInformationFormContainer>

          <CTRComments
            name='Trial Information Comments'
            resultId={id}
            step='trial_information'
          />

          <Grid container justify='center' alignItems='center'>
            <ButtonContainer>
              <ErrorButton type='button' onClick={this.handlePrevious}>
                Previous
              </ErrorButton>
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

export default TrailInformationForm;
