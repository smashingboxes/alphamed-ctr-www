import React from 'react';
import validator from 'validator';
import uuid from 'uuid';
import { Grid, Paper, FormControlLabel, Checkbox } from '@material-ui/core';

import {
  ButtonContainer,
  GridContainer,
  FormEditorLabel
} from './author-adverse-event-form.styles';

import {
  GenericHeaderContainer,
  GenericFieldContainer,
  GenericFormContainer,
  GenericLabelContainer
} from '../../shared/form-container/form-container.styles';

import AdverseDraggableTable from './adverse-table/adverse-draggable-table';

import CTRCustomFieldForm from '../../shared/ctr-custom-field-form/ctr-custom-field-form.component';
import CTRSelect from '../../shared/ctr-select/ctr-select.component';
import CTRInput from '../../shared/ctr-input/ctr-input.component';
import CTRComments from '../../shared/ctr-comments/ctr-comments.component';
import FormEditor from '../../shared/form-editor/form-editor.component';
import SecondaryButton from '../../shared/secondary-button/secondary-button.component';
import CTRCustomTab from '../../shared/ctr-custom-tab/ctr-custom-tab.component';
import CTRCustomDoseTable from '../../shared/ctr-custom-dose-table/ctr-custom-dose-table.component';
import CTRFormContainer from '../../shared/ctr-form-container/ctr-form-container.component';

import {
  event_title,
  event_version,
  patient_cycle,
  dose_limits,
  adverse_events,
  armColumns
} from './event-data';
import { TramRounded } from '@material-ui/icons';

const sae_headers = ["Name", "Grade", "Attribution"];

class AuthorAdverseEventForm extends React.Component {
  state = {
    arms: [],
    isAdverseTableShown: false,
    selectedArmIndex: 0,
    selectedTableIndex: 0
  };

  componentDidMount() {
    const { ctrResult } = this.props;
    this.createInitialForm();
  }

  createNewSAE = () => {
    const inputs = [
      { type: 1, Name: "" },
      { type: 2, Grade: "", options: [1, 2, 3, 4, 5] },
      { type: 2, Attribution: "", options: ["Unrelated", "Unlikely", "Possible", "Probable", "Definite"] }];
    return {
      id: uuid(),
      inputs: inputs
    };
  };

  handleOnSaeToggle = () => {
    const { arms, selectedArmIndex, selectedTableIndex } = this.state;
    const currentArms = [...arms];
    let currentArm = { ...arms[selectedArmIndex] };
    currentArm.tables[selectedTableIndex].isSaeShown = !currentArm.tables[selectedTableIndex].isSaeShown
    currentArms[selectedArmIndex] = currentArm;
    this.setState({ arms: [...currentArms] });
  }

  handleAddField = () => {
    const { arms, selectedArmIndex, selectedTableIndex } = this.state;
    const currentArms = [...arms];
    let currentArm = { ...arms[selectedArmIndex] };
    currentArm.tables[selectedTableIndex].sae.push(this.createNewSAE());
    currentArms[selectedArmIndex] = currentArm;
    this.setState({ arms: [...currentArms] });
  };

  handleOnFieldChanges = (updatedFields) => {
    const { arms, selectedArmIndex, selectedTableIndex } = this.state;
    const currentArms = [...arms];
    let currentArm = { ...arms[selectedArmIndex] };
    currentArm.tables[selectedTableIndex].sae = updatedFields;
    currentArms[selectedArmIndex] = currentArm;
    this.setState({ arms: [...currentArms] });
  };

  // Adverse table
  createNewAdverseRow = (name) => {
    return {
      id: uuid(),
      name: name,
      nc_na: 0,
      field_1: 0,
      field_2: 0,
      field_3: 0,
      field_4: 0,
      field_5: 0,
      all_grades: 0,
      field_n: 0,
      isProvideTable: false
    }
  }

  handleOnAdverseChange = (id, { name, value }) => {
    const { arms, selectedArmIndex, selectedTableIndex } = this.state;
    const currentArms = [...arms];
    // get current table
    const currentTable = arms[selectedArmIndex].tables[selectedTableIndex];
    // update the table field values
    let updatedAdverseTable = [...arms[selectedArmIndex].tables[selectedTableIndex].adverse_table].map(adverse => {
      if (adverse.id === id) {
        // update the field
        adverse[name] = value;
      }
      return adverse;
    });
    // update the all grades and also the N
    updatedAdverseTable = updatedAdverseTable.map(adverse => {
      if (adverse.id === id) {
        const { nc_na, field_1, field_2, field_3, field_4, field_5 } = { ...adverse };
        // update the field
        adverse.all_grades = parseInt(field_1) + parseInt(field_2) + parseInt(field_3) + parseInt(field_4) + parseInt(field_5);
        adverse.field_n = parseInt(adverse.all_grades) + parseInt(nc_na);
      }
      return adverse;
    })
    // update table items
    currentTable.adverse_table = updatedAdverseTable;
    // update arms table
    currentArms[selectedArmIndex].tables[selectedTableIndex] = currentTable

    this.setState({ arms: currentArms });
  }

  handleOnAdverseEventAdd = (name) => {
    const { arms, selectedArmIndex, selectedTableIndex } = this.state;

    // get all arms
    const currentArms = [...arms];
    // get current table
    const currentTable = arms[selectedArmIndex].tables[selectedTableIndex];
    // add new adverse to table
    const updatedAdverseTable = [...currentTable.adverse_table, this.createNewAdverseRow(name)];
    // set table visibility
    currentTable.isAdverseTableShown = true;
    // update table items
    currentTable.adverse_table = updatedAdverseTable;
    // update arms table
    currentArms[selectedArmIndex].tables[selectedTableIndex] = currentTable

    this.setState({ arms: currentArms, isAdverseTableShown: true });
  }

  handleOnAdverseRemove = (id) => {
    const { arms, selectedArmIndex, selectedTableIndex } = this.state;
    const currentArms = [...arms];
    // get current table
    const currentTable = arms[selectedArmIndex].tables[selectedTableIndex];
    // remove the adverse with same id
    const updatedAdverseTable = [...arms[selectedArmIndex].tables[selectedTableIndex].adverse_table].filter(adverse => adverse.id !== id);
    // set table visibility
    currentTable.isAdverseTableShown = updatedAdverseTable.length > 0;;
    // update table items
    currentTable.adverse_table = updatedAdverseTable;
    // update arms table
    currentArms[selectedArmIndex].tables[selectedTableIndex] = currentTable

    this.setState({ arms: currentArms });
  }

  // Creates initial arm and table
  createInitialForm = () => {
    let newArm = this.createNewArm('Control', true);
    let newTable = this.createNewTable(true);
    let newSAE = this.createNewSAE();
    newTable.sae.push(newSAE);
    newArm.tables.push(newTable);
    this.setState({
      arms: [...this.state.arms, newArm]
    }, () => console.log(this.state.arms));
  };

  handleTableRowChanges = (tableRows) => {
    const { arms, selectedArmIndex } = this.state;

    const currentArms = [...arms];
    currentArms[selectedArmIndex].dlt.rows = tableRows;

    this.setState({ arms: [...currentArms] }, () =>
      console.log(this.state.arms)
    );
  };

  // creates arm object
  createNewArm = (value, isSelected) => {
    const inputFields = dose_limits.map((e) => {
      return { value: '' };
    });
    return {
      value: value,
      isSelected: isSelected,
      dlt: {
        columns: [],
        rows: [
          {
            id: uuid(),
            type: 1,
            inputs: inputFields
          }
        ]
      },
      tables: []
    };
  };

  handleOnAddArm = () => {
    let currentArms = this.deselectOtherArms();
    let newArm = this.createNewArm('New arm', true);

    let newTable = this.createNewTable(true);
    let newSAE = this.createNewSAE();
    newTable.sae.push(newSAE);
    newArm.tables.push(newTable);
    let updatedArms = [...currentArms, newArm];

    this.setState({
      arms: [...currentArms, newArm],
      selectedArmIndex: updatedArms.length - 1,
      selectedTableIndex: 0
    });
  };

  // Handle tab selected index change
  handleArmChange = (index) => {
    let updatedArms = [...this.state.arms].map((arm, armIndex) => {
      arm =
        armIndex === index
          ? { ...arm, isSelected: true }
          : { ...arm, isSelected: false };
      return arm;
    });

    this.setState({
      arms: [...updatedArms],
      selectedArmIndex: index,
      selectedTableIndex: 0
    });
  };

  handleOnArmTabUpdate = (updatedTabs) => {
    this.setState({ arms: updatedTabs })
  }

  deselectOtherArms = () => {
    return this.state.arms.map((arm) => {
      let currentArm = { ...arm };
      currentArm.isSelected = false;
      return currentArm;
    });
  };

  // Handle table actions
  createNewTable = (isSelected) => {
    return {
      isSelected: isSelected,
      value: event_title[0],
      details: {
        title: event_title[0],
        version: event_version[0],
        patient_cycle: patient_cycle[0],
        adverse_event: patient_cycle[0],
        adverse_event_legend: ''
      },
      isAdverseTableShown: false,
      adverse_table: [],
      isSaeShown: false,
      sae: [],
      serious_adverse_events_legend: ""
    };
  };

  handleOnAddTable = () => {
    const { arms, selectedArmIndex } = this.state;

    let currentArm = { ...arms[selectedArmIndex] };
    let newTable = this.createNewTable(true);
    let newSAE = this.createNewSAE();
    let updatedTable = this.deselectOtherTable();
    newTable.sae.push(newSAE);
    updatedTable.push(newTable);
    currentArm.tables = updatedTable;

    const allArms = [...arms];
    allArms[selectedArmIndex] = currentArm;

    this.setState({
      arms: [...allArms],
      selectedTableIndex: currentArm.tables.length - 1
    });
  };

  deselectOtherTable = () => {
    const { arms, selectedArmIndex } = this.state;
    return arms[selectedArmIndex].tables.map((table) => {
      let currentTable = { ...table };
      currentTable.isSelected = false;
      return currentTable;
    });
  };

  handleTableChange = (index) => {
    const { arms, selectedArmIndex } = this.state;
    let currentTables = this.deselectOtherTable();
    currentTables[index].isSelected = true;

    let currentArm = { ...arms[selectedArmIndex] };
    currentArm.tables = currentTables;

    const allArms = [...arms];
    allArms[selectedArmIndex] = currentArm;

    this.setState({
      arms: [...allArms],
      selectedTableIndex: index
    });
  };

  handleChange = ({ name, value }) => {
    // Handle adverse event change
    if (name === "adverse_event") {
      this.handleOnAdverseEventAdd(value);
    }
    const { arms, selectedArmIndex, selectedTableIndex } = this.state;
    let currentArms = [...arms];
    currentArms[selectedArmIndex].tables[selectedTableIndex].details[
      name
    ] = value;

    if(name === "title"){
      currentArms[selectedArmIndex].tables[selectedTableIndex].value = value;
    }

    if(name === "serious_adverse_events_legend"){
      currentArms[selectedArmIndex].tables[selectedTableIndex].serious_adverse_events_legend = value;
    }

    this.setState({ arms: currentArms });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const result = this.state.arms.map((arm, index) => {
      const armRows = arm.dlt.rows.map((tableRow) => {
        return {
          dose_level: tableRow.inputs[0].value,
          enrolled: tableRow.inputs[1].value,
          evaluable: tableRow.inputs[2].value,
          number: tableRow.inputs[3].value,
          limiting: tableRow.inputs[4].value
        };
      });

      const eventTables = arm.tables.map((table, index) => {

        const tableSAE = table.sae.map((saes) => {
          return {
            name: saes.inputs[0][sae_headers[0]],
            grade: saes.inputs[1][sae_headers[1]],
            attribution: saes.inputs[2][sae_headers[2]],
          };
        });

        const tableAdverseEvents = table.adverse_table.map((event) => {
          return {
            all_grades: event.all_grades,
            grade_1: event.field_1,
            grade_2: event.field_2,
            grade_3: event.field_3,
            grade_4: event.field_4,
            grade_5: event.field_5,
            name: event.name,
            position: event.nc_na,
            provide_table: event.isProvideTable,
            total: event.field_n
          };
        });

        return {
          ctcae_category_id: table.details.title,
          ctcae_version: table.details.version,
          number: table.details.patient_cycle,
          legend: table.details.adverse_event_legend,
          has_sae: false,
          sae: tableSAE,
          event: tableAdverseEvents,
          serious_adverse_events_legend: table.serious_adverse_events_legend
        }
      });

      return {
        dlt: {
          columns: armColumns,
          rows: armRows
        },
        event_tables: eventTables
      }
    });

    console.log("Submit result", result);
  };

  render() {
    const { arms, selectedArmIndex, selectedTableIndex, adverseRows, isAdverseTableShown } = this.state;

    return (
      <Paper elevation={0}>
        <GenericHeaderContainer>Adverse Events</GenericHeaderContainer>

        <CTRCustomTab label={'Phase'} initialValue='Phase 1' />
        <CTRCustomTab
          label={'Arms'}
          isAppendable={true}
          appendLabel='Arm'
          initialValue='Control'
          tabItems={arms}
          isEditable={TramRounded}
          onTabAdd={this.handleOnAddArm}
          onTabSelectChange={this.handleArmChange}
          onTabUpdateItem={this.handleOnArmTabUpdate}
        />
        <CTRCustomTab
          label={'Tablets'}
          isAppendable={true}
          appendLabel='Tablet'
          tabItems={
            arms && arms[selectedArmIndex] && arms[selectedArmIndex].tables
          }
          onTabAdd={this.handleOnAddTable}
          onTabSelectChange={this.handleTableChange}
          onTabItemRemoved={() => { }}
        />

        <form onSubmit={this.handleSubmit}>
          <GenericFormContainer>
            <GenericFieldContainer>
              <CTRSelect
                label='Title'
                require={false}
                name='title'
                value={
                  arms &&
                  arms[selectedArmIndex] &&
                  arms[selectedArmIndex].tables[selectedTableIndex] &&
                  arms[selectedArmIndex].tables[selectedTableIndex].details
                    .title
                }
                onChange={(e) => this.handleChange(e.target)}
              >
                {event_title.map((title, key) => (
                  <option key={key}>{title}</option>
                ))}
              </CTRSelect>
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRSelect
                label='Version'
                require={false}
                name='version'
                value={
                  arms &&
                  arms[selectedArmIndex] &&
                  arms[selectedArmIndex].tables[selectedTableIndex] &&
                  arms[selectedArmIndex].tables[selectedTableIndex].details
                    .version
                }
                onChange={(e) => this.handleChange(e.target)}
              >
                {event_version.map((version, key) => (
                  <option key={key}>{version}</option>
                ))}
              </CTRSelect>
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRSelect
                label='Number of Patients or Cycles'
                require={false}
                name='patient_cycle'
                value={
                  arms &&
                  arms[selectedArmIndex] &&
                  arms[selectedArmIndex].tables[selectedTableIndex] &&
                  arms[selectedArmIndex].tables[selectedTableIndex].details
                    .patient_cycle
                }
                onChange={(e) => this.handleChange(e.target)}
              >
                {patient_cycle.map((cycle, key) => (
                  <option key={key}>{cycle}</option>
                ))}
              </CTRSelect>
            </GenericFieldContainer>

            <GenericFieldContainer style={{ marginBottom: 30 }}>
              <CTRSelect
                label='Add Adverse Events'
                require={false}
                name='adverse_event'
                value={
                  arms &&
                  arms[selectedArmIndex] &&
                  arms[selectedArmIndex].tables[selectedTableIndex] &&
                  arms[selectedArmIndex].tables[selectedTableIndex].details
                    .adverse_event
                }
                onChange={(e) => this.handleChange(e.target)}
              >
                {adverse_events.map((adverse_event, key) => (
                  <option key={key}>{adverse_event}</option>
                ))}
              </CTRSelect>
            </GenericFieldContainer>

            <GenericFieldContainer>
              {arms &&
                arms[selectedArmIndex] &&
                arms[selectedArmIndex].tables &&
                arms[selectedArmIndex].tables[selectedTableIndex].isAdverseTableShown ?
                <AdverseDraggableTable
                  items={arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].tables &&
                    arms[selectedArmIndex].tables[selectedTableIndex].adverse_table
                  }
                  onItemRemove={this.handleOnAdverseRemove}
                  onItemChange={this.handleOnAdverseChange}
                /> : null}
            </GenericFieldContainer>

            <GenericFieldContainer>
              <GridContainer container alignItems='start' spacing={1}>
                <Grid item xs={3}>
                  <FormEditorLabel>Adverse event legend</FormEditorLabel>
                </Grid>
                <Grid container item xs={9}>
                  <FormEditor
                    require={true}
                    name='adverse_event_legend'
                    value={
                      arms &&
                      arms[selectedArmIndex] &&
                      arms[selectedArmIndex].tables[selectedTableIndex] &&
                      arms[selectedArmIndex].tables[selectedTableIndex].details
                        .adverse_event_legend
                    }
                    setData={(value) =>
                      this.handleChange({ name: 'adverse_event_legend', value })
                    }
                  />
                </Grid>
              </GridContainer>
            </GenericFieldContainer>

            <CTRCustomDoseTable
              heading='Dose Limiting Toxicities'
              headers={dose_limits}
              inputRows={
                arms &&
                arms[selectedArmIndex] &&
                arms[selectedArmIndex].dlt.rows
              }
              onAddRow={(tableRows) => this.handleTableRowChanges(tableRows)}
              onRemoveRow={(tableRows) => this.handleTableRowChanges(tableRows)}
              onRowUpdate={(tableRows) => this.handleTableRowChanges(tableRows)}
              showAddColumn={false}
              showCopyDrugColumns={false}
              showCopyDrugRows={false}
            >
              <div style={{ padding: "5px 30px" }}>
                <span>Do you have any serious adverse events? </span>
                <FormControlLabel
                  control={
                    arms &&
                        arms[selectedArmIndex] &&
                        arms[selectedArmIndex].tables[selectedTableIndex] ?
                    <Checkbox
                      checked={arms[selectedArmIndex].tables[selectedTableIndex].isSaeShown}
                      name=''
                      color='secondary'
                      onChange={this.handleOnSaeToggle}
                    /> : <Checkbox 
                          name=''
                          color='secondary' />
                  }
                  label='Yes'
                  color='primary'
                />
              </div>
              {
                arms &&
                  arms[selectedArmIndex] &&
                  arms[selectedArmIndex].tables[selectedTableIndex] &&
                  arms[selectedArmIndex].tables[selectedTableIndex].isSaeShown ? (
                    <div>
                    <CTRCustomFieldForm
                      heading='Cancer Types or Histologic Subtypes'
                      headers={sae_headers}
                      canSave={false}
                      formFields={arms &&
                        arms[selectedArmIndex] &&
                        arms[selectedArmIndex].tables[selectedTableIndex] &&
                        arms[selectedArmIndex].tables[selectedTableIndex].sae}
                      addNewField={() => {
                        this.handleAddField();
                      }}
                      onFieldChanges={this.handleOnFieldChanges}
                    />

                    <GridContainer container alignItems='start' spacing={1}>
                    <Grid item xs={3}>
                      <FormEditorLabel>Serious Adverse Events Legend</FormEditorLabel>
                    </Grid>
                    <Grid container item xs={9}>
                      <FormEditor
                        require={true}
                        name='serious_adverse_events_legend'
                        value={
                          arms &&
                          arms[selectedArmIndex] &&
                          arms[selectedArmIndex].tables[selectedTableIndex] &&
                          arms[selectedArmIndex].tables[selectedTableIndex].serious_adverse_events_legend
                        }
                        setData={(value) =>
                          this.handleChange({ name: 'serious_adverse_events_legend', value })
                        }
                      />
                    </Grid>
                  </GridContainer>
                  </div>
                  ) : null
              }


            </CTRCustomDoseTable>
          </GenericFormContainer>
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

export default AuthorAdverseEventForm;
