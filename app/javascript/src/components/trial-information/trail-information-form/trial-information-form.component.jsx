import React from 'react';
import validator from 'validator';
import { Grid, Paper } from '@material-ui/core';

import {
  TrailInformationContainer,
  TrailInformationFormContainer,
  FormContainer,
  ButtonContainer,
  FormSelectLabel,
  FormSelectLabelSmall
} from './trial-information-form.styles';

import CTRSelect from '../../shared/ctr-select/ctr-select.component';
import CTRComments from '../../shared/ctr-comments/ctr-comments.component';
import FormEditor from '../../shared/form-editor/form-editor.component';
import SecondaryButton from '../../shared/secondary-button/secondary-button.component';
import DiseaseComboBox from '../disease-combobox/disease-combobox.component';
import { GenericFormHeaderContainer } from '../../shared/styles/shared-styles';

class TrailInformationForm extends React.Component {
  state = {
    id: '',
    diseases: [],
    stageOfDisease: '',
    priorTherapy: '',
    typeOfStudy2: '',
    primaryEndpoints: [],
    secondaryEndpoints: [],
    additionalDetails: '',
    investigatorsAssessment: '',
    diseasesError: '',
    stageOfDiseaseError: '',
    priorTherapyError: '',
    typeOfStudy2Error: '',
    primaryEndpointsError: '',
    secondaryEndpointsError: '',
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
      _id
    } = ctrResult[0];

    return this.setState({
      id: _id.$oid,
      diseases: diseases === 0 ? [''] : diseases,
      stageOfDisease:
        stage_of_disease_or_treatment === null
          ? ''
          : stage_of_disease_or_treatment,
      priorTherapy: prior_therapy === null ? '' : prior_therapy,
      typeOfStudy2: type_of_study_2 === null ? '' : type_of_study_2,
      primaryEndpoints: primary_endpoints === 0 ? [''] : primary_endpoints,
      secondaryEndpoints:
        secondary_endpoints === 0 ? [''] : secondary_endpoints,
      additionalDetails: endpoints_details === null ? '' : endpoints_details,
      investigatorsAssessment:
        investigators_assessment === null ? '' : investigators_assessment
    });
  }

  handleOnItemAdd = (disease) => {
    console.log(disease);
    let currentDiseases = [...this.state.diseases];

    /*let currentDiseases = [...this.state.diseases];
    currentDiseases.push(disease);
    this.setState({ diseases: currentDiseases })*/
  }

  handleOnItemRemove = (disease) => {
    let currentDiseases = [...this.state.diseases];
    currentDiseases.splice(disease, 1);
    this.setState({ diseases: currentDiseases })
  }

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
      investigatorsAssessment
    } = this.state;

    const { createCTRTrailInformationStart, user } = this.props;

    if (diseases.length === 0 || diseases[0] === '') {
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

    if (validator.isEmpty(investigatorsAssessment)) {
      this.setState({
        investigatorsAssessmentError: 'This field is mandatory.'
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
      primaryEndpointsError: '',
      secondaryEndpointsError: '',
      additionalDetailsError: '',
      investigatorsAssessmentError: ''
    });

    this.setState({ [name]: value });
  };



  render() {
    const {
      background,
      methods,
      results,
      conclusions,
      discussion,
      lessonsLearned,
      backgroundError,
      methodsError,
      resultsError,
      conclusionsError,
      discussionError,
      lessonsLearnedError
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
                name = "hello"
                onItemAdd={ (selected) => this.handleOnItemAdd(selected)}
                onItemRemove={ (removed) => console.log(removed)}
              />
            </FormContainer>

            <FormContainer>
              <CTRSelect
                label='Stage of disease / treatment'
                require={true}
                onChange={this.handleChange}
                name = "stageOfDisease"
              >
                {
                  [
                    "Prevention",
                    "Neo-adjuvant",
                    "Adjuvant",
                    "Primary",
                    "Metastatic/Advanced"
                  ].map((stage, key) => (
                    <option key={key}>{stage}</option>
                  ))
                }
              </CTRSelect>
            </FormContainer>

            <FormContainer>
              <CTRSelect
                label='Prior Therapy'
                require={true}
                onChange={this.handleChange}
                name = "priorTherapy"
              >
                {
                  [
                    "None",
                    "1 prior regimen",
                    "2 prior regimens",
                    "More than 2 prior regimens",
                    "No designated number of regimens"
                  ].map((stage, key) => (
                    <option key={key}>{stage}</option>
                  ))
                }
              </CTRSelect>
            </FormContainer>

            <FormContainer>
              <CTRSelect
                label='Type of study - 2'
                require={true}
                onChange={this.handleChange}
                name = "typeOfStudy2"
              >
                {
                  [
                    "3+3",
                    "Accelerated Titration",
                    "Adaptive Design",
                    "Modified Fibonacci",
                    "Rolling Six",
                    "Other"
                  ].map((stage, key) => (
                    <option key={key}>{stage}</option>
                  ))
                }
              </CTRSelect>
            </FormContainer>

            <FormContainer>
              <CTRSelect
                label='Primary Endpoint(s)'
                require={true}
                onChange={this.handleChange}
                name = "primaryEndpoints"
              >
                {
                  [
                    "Toxicity",
                    "Tolerability",
                    "Deliverability",
                    "Safety",
                    "Maximum Tolerated Dose",
                    "Recommended Phase II Dose",
                    "Pharmacodynamic",
                    "Correlative Endpoint",
                    "other"
                  ].map((stage, key) => (
                    <option key={key}>{stage}</option>
                  ))
                }
              </CTRSelect>
            </FormContainer>

            <FormContainer>

              <CTRSelect
                label='Secondary Endpoints(s)'
                require={true}
                onChange={this.handleChange}
                name = "secondaryEndpoints"
              >
                {
                  [
                    "Toxicity",
                    "Tolerability",
                    "Deliverability",
                    "Safety",
                    "Maximum Tolerated Dose",
                    "Recommended Phase II Dose",
                    "Pharmacodynamic",
                    "Correlative Endpoint",
                    "other"
                  ].map((stage, key) => (
                    <option key={key}>{stage}</option>
                  ))
                }
              </CTRSelect>
            </FormContainer>

            <FormContainer>
              <Grid style = {{ paddingLeft: 50, margin: "50px 0px" }} container alignItems = "start" spacing = {1}>
                <Grid item xs = {3}>
                <FormSelectLabel>Additional Details of Endpoints or Study Design:</FormSelectLabel>
                </Grid>
                <Grid container direction = "column" alignItems ="start" justify="flex-start" item xs = {9}>
                  <FormEditor
                    require={true}
                    data={lessonsLearned}
                    //onChange={this.handleChange}
                    name = "additionalDetails"
                    error={lessonsLearnedError}
                  />
                  <FormSelectLabelSmall>
                    Include Endpoint Target and Power Analysis.
                  </FormSelectLabelSmall>
                  <FormSelectLabelSmall>
                    Include outcome considered positive or that would meet futility
                  </FormSelectLabelSmall>
                </Grid>
              </Grid>

            </FormContainer>

            <FormContainer>
              <CTRSelect
                label='Investigator’s Assessment'
                require={true}
                onChange={this.handleChange}
                name = "investigatorsAssessment"
              >
                {
                  [
                    "Active and should be pursued further",
                    "Active but results overtaken by other developments",
                    "Active but too toxic as administered in this study",
                    "Inactive because results did not meet primary endpoint",
                    "Correlative endpoints met but not powered to assess activity",
                    "Correlative endpoints not met but clinical activity observed",
                    "Evidence of target inhibition but no or minimal anti-tumor activity",
                    "Poorly tolerated/not feasible",
                    "Level of activity did not meet planned end point",
                    "Other"
                  ].map((stage, key) => (
                    <option key={key}>{stage}</option>
                  ))
                }
              </CTRSelect>
            </FormContainer>

          </TrailInformationFormContainer>

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

export default TrailInformationForm;
