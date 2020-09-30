import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import uuid from 'uuid';

import {
  ButtonContainer,
  FormEditorLabel,
  GridContainer
} from './author-patient-char-form.styles';

import {
  GenericHeaderContainer,
  GenericFieldContainer,
  GenericFormContainer
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

const tableHeaders = ['Name', 'Number'];
class AuthorPatientCharForm extends React.Component {
  state = {
    arms: [],
    typeOfStudy2: '',
    phaseType: '',
    selectArmIndex: 0,
    id: ''
  };

  componentDidMount() {
    const { ctrResult } = this.props;

    // if (ctrResult === null) return;
    // if (ctrResult.length === 0) return;

    // const {
    //   study_phase,
    //   type_of_study_2,
    //   result_count,
    //   _id,
    //   arms
    // } = ctrResult[0];

    // let newArm = this.createNewArm('Control', true);
    // this.setState({
    //   arms: [...this.state.arms, newArm]
    // });

    // if (arms.length > 0) {
    //   return this.setState({
    //     typeOfStudy2: type_of_study_2,
    //     phaseType: study_phase,
    //     resultCount:
    //       result_count === null || result_count <= 5 ? 6 : result_count,
    //     id: _id.$oid
    //   });
    // } else {
    //   this.createInitialForm();

    //   return this.setState({
    //     typeOfStudy2: type_of_study_2,
    //     phaseType: study_phase,
    //     resultCount:
    //       result_count === null || result_count <= 0 ? 1 : result_count,
    //     id: _id.$oid
    //   });
    // }
  }

  createNewArm = (value, isSelected) => {
    return {
      value: value,
      isSelected: isSelected,
      male: '',
      female: '',
      stage: '',
      age: '',
      systemicTherapies: '',
      field_0: '',
      field_1: '',
      field_2: '',
      field_3: '',
      unknown: '',
      other: '',
      cancerTypes: [this.createNewFormField()] // initial form field
    };
  };

  createNewFormField = () => {
    const inputs = tableHeaders.map((header) => {
      return { type: 1, [header]: '' };
    });
    return {
      id: uuid(),
      inputs: inputs
    };
  };

  handleAddField = () => {
    const currentArms = [...this.state.arms];
    let currentArm = { ...this.state.arms[this.state.selectArmIndex] };
    currentArm.cancerTypes.push(this.createNewFormField());
    currentArms[this.state.selectArmIndex] = currentArm;
    this.setState({ arms: [...currentArms] });
  };

  handleOnFieldChanges = (updatedFields) => {
    const currentArms = [...this.state.arms];
    let currentArm = { ...this.state.arms[this.state.selectArmIndex] };
    currentArm.cancerTypes = updatedFields;
    currentArms[this.state.selectArmIndex] = currentArm;
    this.setState({ arms: [...currentArms] });
  };

  handleOnAddArm = () => {
    let currentArms = this.deselectOtherArms();
    let newArm = this.createNewArm('New arm', true);
    let selectedArmIndex = [...currentArms, newArm].length - 1;
    this.setState(
      {
        arms: [...currentArms, newArm],
        selectArmIndex: selectedArmIndex
      },
      () => console.log(this.state.arms)
    );
  };

  deselectOtherArms = () => {
    let tempArms = [...this.state.arms];
    return tempArms.map((arm) => {
      let currentArm = { ...arm };
      currentArm.isSelected = false;
      return currentArm;
    });
  };

  // Handle tab selected index change
  handleArmChange = (index) => {
    let currentArms = [...this.state.arms].map((arm, armIndex) => {
      arm =
        armIndex === index
          ? { ...arm, isSelected: true }
          : { ...arm, isSelected: false };
      return arm;
    });
    this.setState({
      arms: [...currentArms],
      selectArmIndex: index
    });
  };

  // handle tab remove item
  handleOnArmTabUpdate = (updatedTabs) => {
    this.setState({ arms: updatedTabs });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const arms = this.state.arms.map((arm) => {
      const cancerTypes = arm.cancerTypes.map((types) => {
        return {
          name: types.inputs[0][tableHeaders[0]],
          number: types.inputs[1][tableHeaders[1]]
        };
      });
      return {
        id: '5f4f2befd765b802667dd312',
        patient_male: arm.male,
        patient_female: arm.female,
        patient_stage: arm.stage,
        patient_age: arm.age,
        patient_median_therapies: arm.systemicTherapies,
        patient_performance: {
          0: arm.field_0,
          1: arm.field_1,
          2: arm.field_2,
          3: arm.field_3,
          unknown: arm.unknown
        },
        patient_other: arm.other,
        patient_cancer_types: cancerTypes
      };
    });
    console.log(arms);
  };

  handleChange = ({ name, value }) => {
    let allArms = [...this.state.arms];
    allArms[this.state.selectArmIndex][name] = value;
    this.setState({ arms: [...allArms] });
  };

  render() {
    const { arms, selectArmIndex, id, phaseType, typeOfStudy2 } = this.state;
    return (
      <Paper elevation={0}>
        <GenericHeaderContainer>Patient Characteristics</GenericHeaderContainer>
        <CTRCustomTab label={'Phase'} initialValue={phaseType} />
        <CTRCustomTab
          label={'Arms'}
          isAppendable={true}
          appendLabel='Arm'
          tabItems={arms}
          isEditable={true}
          onTabAdd={this.handleOnAddArm}
          onTabSelectChange={this.handleArmChange}
          onTabUpdateItem={this.handleOnArmTabUpdate}
        />
        <form onSubmit={this.handleSubmit}>
          <GenericFormContainer style={{ padding: '10px 50px' }}>
            <GenericFieldContainer style={{ marginTop: 30 }}>
              <GridContainer container alignItems='start' spacing={1}>
                <Grid item xs={3}>
                  <FormEditorLabel>Number of Patients</FormEditorLabel>
                </Grid>
                <Grid container item xs={9}>
                  <CTRFormContainer label=''>
                    <CTRCustomInputPill
                      label='Male'
                      width={250}
                      name='male'
                      value={
                        arms &&
                        arms[selectArmIndex] &&
                        arms[selectArmIndex].male
                      }
                      onChange={(e) => this.handleChange(e.target)}
                    />
                    <CTRSpacer />
                    <CTRCustomInputPill
                      label='Female'
                      width={250}
                      name='female'
                      value={
                        arms &&
                        arms[selectArmIndex] &&
                        arms[selectArmIndex].female
                      }
                      onChange={(e) => this.handleChange(e.target)}
                    />
                  </CTRFormContainer>
                </Grid>
              </GridContainer>
            </GenericFieldContainer>

            <GenericFieldContainer style={{ marginTop: 30 }}>
              <GridContainer container alignItems='start' spacing={1}>
                <Grid item xs={3}>
                  <FormEditorLabel>Stage</FormEditorLabel>
                </Grid>
                <Grid container item xs={9}>
                  <FormEditor
                    require={true}
                    value={
                      arms && arms[selectArmIndex] && arms[selectArmIndex].stage
                    }
                    setData={(value) => {
                      this.handleChange({ name: 'stage', value });
                    }}
                  />
                </Grid>
              </GridContainer>
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRInput
                type='text'
                require={false}
                label='Age: Median (range)'
                name='age'
                value={arms && arms[selectArmIndex] && arms[selectArmIndex].age}
                onChange={(e) => this.handleChange(e.target)}
              />
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRInput
                type='number'
                require={false}
                label='Number of prior systemic therapies: Median (range)'
                name='systemicTherapies'
                value={
                  arms &&
                  arms[selectArmIndex] &&
                  arms[selectArmIndex].systemicTherapies
                }
                onChange={(e) => this.handleChange(e.target)}
              />
            </GenericFieldContainer>

            <GenericFieldContainer style={{ marginTop: 30 }}>
              <GridContainer container alignItems='start' spacing={1}>
                <Grid item xs={3}></Grid>
                <Grid container item xs={9}>
                  <CTRSpacer top={50} />
                  <div style={{ width: 500 }}>
                    <CTRCustomInputPill
                      label='0'
                      width={250}
                      name='field_0'
                      value={
                        arms &&
                        arms[selectArmIndex] &&
                        arms[selectArmIndex].field_0
                      }
                      onChange={(e) => this.handleChange(e.target)}
                    />
                    <CTRCustomInputPill
                      label='1'
                      width={250}
                      name='field_1'
                      value={
                        arms &&
                        arms[selectArmIndex] &&
                        arms[selectArmIndex].field_1
                      }
                      onChange={(e) => this.handleChange(e.target)}
                    />
                    <CTRCustomInputPill
                      label='2'
                      width={250}
                      name='field_2'
                      value={
                        arms &&
                        arms[selectArmIndex] &&
                        arms[selectArmIndex].field_2
                      }
                      onChange={(e) => this.handleChange(e.target)}
                    />
                    <CTRCustomInputPill
                      label='3'
                      width={250}
                      name='field_3'
                      value={
                        arms &&
                        arms[selectArmIndex] &&
                        arms[selectArmIndex].field_3
                      }
                      onChange={(e) => this.handleChange(e.target)}
                    />
                    <CTRCustomInputPill
                      label='unknown'
                      width={250}
                      name='unknown'
                      value={
                        arms &&
                        arms[selectArmIndex] &&
                        arms[selectArmIndex].unknown
                      }
                      onChange={(e) => this.handleChange(e.target)}
                    />
                  </div>
                  <CTRSpacer bottom={50} />
                </Grid>
              </GridContainer>
            </GenericFieldContainer>

            <GenericFieldContainer style={{ marginTop: 30, marginBottom: 30 }}>
              <GridContainer container alignItems='start' spacing={1}>
                <Grid item xs={3}>
                  <FormEditorLabel>Other</FormEditorLabel>
                </Grid>
                <Grid container item xs={9}>
                  <FormEditor
                    require={true}
                    value={
                      arms && arms[selectArmIndex] && arms[selectArmIndex].other
                    }
                    setData={(value) => {
                      this.handleChange({ name: 'other', value });
                    }}
                  />
                </Grid>
              </GridContainer>
            </GenericFieldContainer>

            <CTRCustomFieldForm
              heading='Cancer Types or Histologic Subtypes'
              headers={tableHeaders}
              formFields={
                arms && arms[selectArmIndex] && arms[selectArmIndex].cancerTypes
              }
              addNewField={() => {
                this.handleAddField();
              }}
              onFieldChanges={this.handleOnFieldChanges}
            />
          </GenericFormContainer>

          <CTRComments
            name='Patient Characteristics Comments'
            resultId={id}
            step='patient_characteristics'
          />

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
