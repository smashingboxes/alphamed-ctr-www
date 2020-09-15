import React from 'react';
import validator from 'validator';
import { Grid, Paper } from '@material-ui/core';

import {
  TrailInformationContainer,
  TrailInformationFormContainer,
  FormContainer,
  ButtonContainer
} from './trial-information-form.styles';

import CTRComments from '../../shared/ctr-comments/ctr-comments.component';
import FormEditor from '../../shared/form-editor/form-editor.component';
import SecondaryButton from '../../shared/secondary-button/secondary-button.component';
import DiseaseComboBox from '../disease-combobox/disease-combobox.component';

class TrailInformationForm extends React.Component {
  state = {
    id: '',
    diseases: [''],
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
        <TrailInformationContainer>
          Clinical Trial Information
        </TrailInformationContainer>
        <form onSubmit={this.handleSubmit}>
          <TrailInformationFormContainer>
            <FormContainer>
              <DiseaseComboBox />
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
