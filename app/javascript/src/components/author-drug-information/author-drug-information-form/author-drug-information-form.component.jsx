import React from 'react';
import validator from 'validator';
import { Grid, Paper } from '@material-ui/core';
import uuid from 'uuid';

import {
  ButtonContainer,
  FormEditorLabel,
  GridContainer
} from './author-drug-information-form.styles';
import {
  GenericHeaderContainer,
  GenericFieldContainer,
  GenericFormContainer
} from '../../shared/form-container/form-container.styles';

import {
  drug_class,
  drug_unit,
  drug_route,
  drug_type
} from './author-drug-information.data';

import CTRCustomTab from '../../shared/ctr-custom-tab/ctr-custom-tab.component';
import CTRCustomDoseTable from '../../shared/ctr-custom-dose-table/ctr-custom-dose-table.component';
import CTRSelect from '../../shared/ctr-select/ctr-select.component';
import CTRInput from '../../shared/ctr-input/ctr-input.component';
import CTRComments from '../../shared/ctr-comments/ctr-comments.container';
import FormEditor from '../../shared/form-editor/form-editor.component';
import SecondaryButton from '../../shared/secondary-button/secondary-button.component';

class AuthorDrugInformationForm extends React.Component {
  state = {
    id: '',
    typeOfStudy2: '',
    phaseType: '',
    drugError: '',
    resultCount: 0,
    arms: [],
    drugs: [],
    selectArmIndex: 0,
    selectDrugIndex: 0,
    dose_headers: [
      'Dose',
      'Dose of Drug',
      'Number of Enrolled',
      'Number Evaluable for Toxicity'
    ]
  };

  componentDidMount() {
    const { ctrResult } = this.props;

    if (ctrResult === null) return;
    if (ctrResult.length === 0) return;

    const {
      study_phase,
      type_of_study_2,
      result_count,
      _id,
      arms
    } = ctrResult[0];

    let newDrugArray;
    let newArmArray;

    if (arms.length > 0 || arms !== null || arms !== []) {
      newArmArray = arms.map((arm, index) => {
        return {
          id: arm._id.$oid,
          value: arm.name,
          det: arm.det,
          isSelected: index === 0 ? true : false
        };
      });
    }

    if (arms.length > 0 || arms !== null || arms !== []) {
      newDrugArray = arms.map((arm) => {
        return arm.drugs.map((drug, index) => {
          return {
            details: {
              id: drug._id.$oid,
              companyName: drug.company_name,
              dose: drug.dose,
              drugClass: drug.drug_class,
              drugType: drug.drug_type,
              per: drug.per,
              route: drug.route,
              schedule: drug.schedule,
              tradeName: drug.trade_name,
              unit: drug.unit,
              workingName: drug.generic_name
            },
            isSelected: index === 0 ? true : false,
            value: drug.generic_name
          };
        });
      });
    }

    if (arms.length > 0) {
      return this.setState({
        arms: newArmArray === null || newArmArray.length < 0 ? [] : newArmArray,
        drugs:
          newDrugArray === null || newDrugArray.length < 0 ? [] : newDrugArray,
        typeOfStudy2: type_of_study_2,
        phaseType: study_phase,
        resultCount:
          result_count === null || result_count <= 5 ? 6 : result_count,
        id: _id.$oid
      });
    } else {
      this.createInitialForm();

      return this.setState({
        typeOfStudy2: type_of_study_2,
        phaseType: study_phase,
        resultCount:
          result_count === null || result_count <= 0 ? 1 : result_count,
        id: _id.$oid
      });
    }
  }

  handleTableRowChanges = (tableRows, action) => {
    const currentArms = [...this.state.arms];
    currentArms[this.state.selectArmIndex].det.rows = tableRows;

    this.setState({ arms: [...currentArms] });
  };

  createInitialForm = () => {
    let newArm = this.createNewArm('Control', true);
    let newDrugs = this.createNewDrugArray('New Drug', true);
    this.setState({
      arms: [...this.state.arms, newArm],
      drugs: [...this.state.drugs, newDrugs]
    });
  };

  createNewArm = (value, isSelected) => {
    const inputFields = [];
    this.state.dose_headers.forEach((e) => {
      inputFields.push({ value: '' });
    });
    return {
      value: value,
      isSelected: isSelected,
      det: {
        columns: [],
        rows: [
          {
            id: uuid(),
            type: 1,
            inputs: inputFields
          }
        ]
      },
      drugs: []
    };
  };

  createNewDrug = (workingName, isSelected) => {
    return {
      isSelected: isSelected,
      value: workingName,
      details: {
        workingName: workingName,
        tradeName: '',
        companyName: '',
        drugType: drug_type[0],
        drugClass: drug_class[0],
        dose: '',
        unit: drug_unit[0],
        per: drug_unit[0],
        route: drug_route[0],
        schedule: ''
      }
    };
  };

  createNewDrugArray = (workingName, isSelected) => {
    let drugsArray = [];
    drugsArray.push(this.createNewDrug(workingName, isSelected));
    return drugsArray;
  };

  // handle tab add item
  handleOnAddArm = () => {
    let currentArms = this.deselectOtherArms();
    let currentDrugs = [...this.state.drugs];

    let newArm = this.createNewArm('New Arm', true);
    let newDrugs = this.createNewDrugArray('New Drug', true);

    let selectedArmIndex = [...currentArms, newArm].length - 1;

    this.setState({
      arms: [...currentArms, newArm],
      drugs: [...currentDrugs, newDrugs],
      selectArmIndex: selectedArmIndex,
      selectDrugIndex: 0
    });
  };

  deselectOtherArms = () => {
    let tempArms = [...this.state.arms];
    return tempArms.map((arm) => {
      let currentArm = { ...arm };
      currentArm.isSelected = false;
      return currentArm;
    });
  };

  handleOnAddDrug = () => {
    let allDrugs = [...this.state.drugs];
    let newDrug = this.createNewDrug('New Drug', true);
    let currentDrugs = this.deselectOtherDrugs();
    currentDrugs.push(newDrug);
    allDrugs[this.state.selectArmIndex] = currentDrugs;
    this.setState({
      drugs: [...allDrugs],
      selectDrugIndex: currentDrugs.length - 1
    });
  };

  deselectOtherDrugs = () => {
    let tempDrugs = [...this.state.drugs[this.state.selectArmIndex]];
    return tempDrugs.map((drug) => {
      let currentDrug = { ...drug };
      currentDrug.isSelected = false;
      return currentDrug;
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
      selectArmIndex: index,
      selectDrugIndex: 0
    });
  };

  handleDrugChange = (index) => {
    let allDrugs = [...this.state.drugs];
    let currentDrugs = this.deselectOtherDrugs();
    currentDrugs[index].isSelected = true;
    allDrugs[this.state.selectArmIndex] = currentDrugs;
    this.setState({
      drugs: [...allDrugs],
      selectDrugIndex: index
    });
  };

  // handle tab remove item
  handleOnArmTabUpdate = (updatedTabs) => {
    this.setState({ arms: [...updatedTabs] }, () => console.log(this.state.arms));
  };

  handleChange = ({ name, value }) => {
    let allDrugs = [...this.state.drugs];

    if (allDrugs[this.state.selectArmIndex][this.state.selectDrugIndex]) {
      allDrugs[this.state.selectArmIndex][this.state.selectDrugIndex].details[
        name
      ] = value;
    }

    if(name === "workingName"){
      allDrugs[this.state.selectArmIndex][this.state.selectDrugIndex].value = value;
    }

    this.setState({ drugs: [...allDrugs] });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { phaseType, id, resultCount } = this.state;
    const { createCTRDrugInformationStart, user } = this.props;

    const parsedArms = this.state.arms.map((arm, index) => {
      const armRows = arm.det.rows.map((tableRow) => {
        return {
          dose: tableRow.inputs && tableRow.inputs[0].value,
          dose_level: tableRow.inputs && tableRow.inputs[1].value,
          enrolled: tableRow.inputs && tableRow.inputs[2].value,
          evaluable: tableRow.inputs && tableRow.inputs[3].value
        };
      });

      const armDrugs = this.state.drugs[index].map((drug) => {
        if (validator.isEmpty(drug.details.workingName)) {
          return this.setState({
            drugError: 'This field is mandatory.'
          });
        }

        return {
          id: drug.details.id ? drug.details.id : null,
          arm_name: arm.value,
          generic_name: drug.details.workingName,
          trade_name: drug.details.tradeName,
          company_name: drug.details.companyName,
          drug_type: drug.details.drugType,
          drug_class: drug.details.drugClass,
          dose: drug.details.dose,
          unit: drug.details.unit,
          per: drug.details.per,
          route: drug.details.route,
          schedule: drug.details.schedule
        };
      });

      return {
        id: arm.id ? arm.id : null,
        name: arm.value,
        phase: phaseType,
        det: {
          columns: [
            {
              id: 'dose_level',
              name: 'Dose Level',
              field: 'dose_level'
            },
            {
              id: 'dose',
              name: 'Dose of Drug',
              field: 'dose'
            },
            {
              id: 'enrolled',
              name: 'Number Enrolled',
              field: 'enrolled'
            },
            {
              id: 'evaluable',
              name: 'Number Evaluable for Toxicity',
              field: 'evaluable'
            }
          ],
          rows: armRows
        },
        drugs: armDrugs
      };
    });

    return createCTRDrugInformationStart({
      arms: parsedArms,
      authToken: user.authentication_token,
      id,
      resultCount
    });
  };

  render() {
    const {
      phaseType,
      typeOfStudy2,
      arms,
      drugError,
      drugs,
      selectArmIndex,
      selectDrugIndex,
      dose_headers,
      id
    } = this.state;

    return (
      <Paper elevation={0}>
        <GenericHeaderContainer>Drug information</GenericHeaderContainer>
        <CTRCustomTab label={'Phase'} initialValue={phaseType} />
        <CTRCustomTab
          label={'Arms'}
          isAppendable={
            typeOfStudy2 === 'Randomized' || typeOfStudy2 === 'Other'
              ? true
              : false
          }
          appendLabel='Arm'
          isEditable={true}
          tabItems={arms && arms}
          onTabAdd={this.handleOnAddArm}
          onTabSelectChange={this.handleArmChange}
          onTabUpdateItem={this.handleOnArmTabUpdate}
        />
        <CTRCustomTab
          label={'Drugs'}
          isAppendable={true}
          appendLabel='Drug'
          tabItems={drugs[selectArmIndex]}
          onTabAdd={this.handleOnAddDrug}
          onTabSelectChange={this.handleDrugChange}
          onTabItemRemoved={({ value, isSelected }, index) => {}}
        />
        <form onSubmit={this.handleSubmit}>
          <GenericFormContainer>
            <GenericFieldContainer>
              <CTRInput
                type='text'
                name='workingName'
                require={true}
                value={
                  drugs &&
                  drugs[selectArmIndex] &&
                  drugs[selectArmIndex][selectDrugIndex] &&
                  drugs[selectArmIndex][selectDrugIndex].details.workingName
                }
                onChange={(e) => this.handleChange(e.target)}
                label='Generic/Working Name'
                error={
                  drugs &&
                  drugs[selectArmIndex] &&
                  drugs[selectArmIndex][selectDrugIndex] &&
                  drugs[selectArmIndex][selectDrugIndex].details.workingName ===
                    ''
                    ? drugError
                    : ''
                }
              />
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRInput
                type='text'
                name='tradeName'
                require={false}
                value={
                  drugs &&
                  drugs[selectArmIndex] &&
                  drugs[selectArmIndex][selectDrugIndex] &&
                  drugs[selectArmIndex][selectDrugIndex].details.tradeName
                }
                onChange={(e) => this.handleChange(e.target)}
                label='Trade Name'
              />
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRInput
                type='text'
                name='companyName'
                require={false}
                value={
                  drugs &&
                  drugs[selectArmIndex] &&
                  drugs[selectArmIndex][selectDrugIndex] &&
                  drugs[selectArmIndex][selectDrugIndex].details.companyName
                }
                onChange={(e) => this.handleChange(e.target)}
                label='Company Name'
              />
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRSelect
                label='Drug Type'
                require={false}
                name='drugType'
                value={
                  drugs &&
                  drugs[selectArmIndex] &&
                  drugs[selectArmIndex][selectDrugIndex] &&
                  drugs[selectArmIndex][selectDrugIndex].details.drugType
                }
                onChange={(e) => this.handleChange(e.target)}
              >
                {drug_type.map((stage, key) => (
                  <option key={key}>{stage}</option>
                ))}
              </CTRSelect>
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRSelect
                label='Drug Class'
                require={false}
                name='drugClass'
                value={
                  drugs &&
                  drugs[selectArmIndex] &&
                  drugs[selectArmIndex][selectDrugIndex] &&
                  drugs[selectArmIndex][selectDrugIndex].details.drugClass
                }
                onChange={(e) => this.handleChange(e.target)}
              >
                {drug_class.map((stage, key) => (
                  <option key={key}>{stage}</option>
                ))}
              </CTRSelect>
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRInput
                type='text'
                name='dose'
                require={false}
                value={
                  drugs &&
                  drugs[selectArmIndex] &&
                  drugs[selectArmIndex][selectDrugIndex] &&
                  drugs[selectArmIndex][selectDrugIndex].details.dose
                }
                onChange={(e) => this.handleChange(e.target)}
                label='Dose'
              />
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRSelect
                label='Unit'
                require={false}
                name='unit'
                value={
                  drugs &&
                  drugs[selectArmIndex] &&
                  drugs[selectArmIndex][selectDrugIndex] &&
                  drugs[selectArmIndex][selectDrugIndex].details.unit
                }
                onChange={(e) => this.handleChange(e.target)}
              >
                {drug_unit.map((stage, key) => (
                  <option key={key}>{stage}</option>
                ))}
              </CTRSelect>
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRSelect
                label='Per'
                require={false}
                name='per'
                value={
                  drugs &&
                  drugs[selectArmIndex] &&
                  drugs[selectArmIndex][selectDrugIndex] &&
                  drugs[selectArmIndex][selectDrugIndex].details.per
                }
                onChange={(e) => this.handleChange(e.target)}
              >
                {drug_unit.map((stage, key) => (
                  <option key={key}>{stage}</option>
                ))}
              </CTRSelect>
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRSelect
                label='Route'
                require={false}
                name='route'
                value={
                  drugs &&
                  drugs[selectArmIndex] &&
                  drugs[selectArmIndex][selectDrugIndex] &&
                  drugs[selectArmIndex][selectDrugIndex].details.route
                }
                onChange={(e) => this.handleChange(e.target)}
              >
                {drug_route.map((stage, key) => (
                  <option key={key}>{stage}</option>
                ))}
              </CTRSelect>
            </GenericFieldContainer>

            <GenericFieldContainer style={{ marginTop: 30 }}>
              <GridContainer container alignItems='start' spacing={1}>
                <Grid item xs={3}>
                  <FormEditorLabel>Schedule</FormEditorLabel>
                </Grid>
                <Grid container item xs={9}>
                  <FormEditor
                    require={true}
                    setData={(value) =>
                      this.handleChange({ name: 'schedule', value })
                    }
                    name='schedule'
                    value={
                      drugs &&
                      drugs[selectArmIndex] &&
                      drugs[selectArmIndex][selectDrugIndex] &&
                      drugs[selectArmIndex][selectDrugIndex].details.schedule
                        ? drugs[selectArmIndex][selectDrugIndex].details
                            .schedule
                        : ''
                    }
                  />
                </Grid>
              </GridContainer>
            </GenericFieldContainer>

            <GenericFieldContainer>
              <Grid item xs={12}>
                <CTRCustomDoseTable
                  heading='Dose Escalation Table'
                  inputRows={
                    arms &&
                    arms[selectArmIndex] &&
                    arms[selectArmIndex].det.rows
                  }
                  headers={dose_headers}
                  onAddRow={(tableRows) =>
                    this.handleTableRowChanges(tableRows, 'add')
                  }
                  onRemoveRow={(tableRows) =>
                    this.handleTableRowChanges(tableRows, 'remove')
                  }
                  onRowUpdate={(tableRows) =>
                    this.handleTableRowChanges(tableRows, 'update')
                  }
                  showAddColumn={false}
                  showCopyDrugRows={false}
                  showCopyDrugColumns={false}
                ></CTRCustomDoseTable>
              </Grid>
            </GenericFieldContainer>
          </GenericFormContainer>

          <CTRComments
            name='Drug Information Comments'
            resultId={id}
            step='drug_information'
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

export default AuthorDrugInformationForm;
