import React from 'react';
import validator from 'validator';
import { Grid, Paper } from '@material-ui/core';

import {
  ButtonContainer
} from './author-drug-information-form.styles'

import { drug_class, drug_unit, drug_route, drug_type } from '../drug-data';

import {
  GenericHeaderContainer,
  GenericFieldContainer,
  GenericFormContainer,
  GenericLabelContainer
} from '../../shared/form-container/form-container.styles';

import CTRCustomTab from '../../shared/ctr-custom-tab/ctr-custom-tab.component';
import CTRCustomDoseTable from '../../shared/ctr-custom-dose-table/ctr-custom-dose-table.component'
import CTRSelect from '../../shared/ctr-select/ctr-select.component';
import CTRInput from '../../shared/ctr-input/ctr-input.component';
import CTRComments from '../../shared/ctr-comments/ctr-comments.component';
import FormEditor from '../../shared/form-editor/form-editor.component';
import SecondaryButton from '../../shared/secondary-button/secondary-button.component';

class AuthorDrugInformationForm extends React.Component {

  componentDidMount() {
    const { ctrResult } = this.props;
  }

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleChange = (event) => {
    const { name, value } = event.target;
  };

  render() {

    return (
      <Paper elevation={0}>
        <GenericHeaderContainer>
          Drug information
        </GenericHeaderContainer>
        <CTRCustomTab
          label={"Phase"}
          initialValue="Phase 1"
        />
        <CTRCustomTab
          label={"Arms"}
          isAppendable={true}
          appendLabel="Arm"
          onTabAdd = { ({value, isSelected}) => {}}
          onTabSelectChange = { ({value, isSelected}, index) => {}}
          onTabItemRemoved = { ({value, isSelected}, index) => {} }
        />
        <CTRCustomTab
          label={"Drugs"}
          isAppendable={true}
          appendLabel="Drug"
          onTabAdd = { ({value, isSelected}) => {}}
          onTabSelectChange = { ({value, isSelected}, index) => {}}
          onTabItemRemoved = { ({value, isSelected}, index) => {}}
        />
        <form onSubmit={this.handleSubmit}>
          <GenericFormContainer>

            <GenericFieldContainer>
              <CTRInput
                type='text'
                name='workingName'
                require={false}
                onChange={this.handleChange}
                label='Generic/Working Name'
              />
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRInput
                type='text'
                name='tradeName'
                require={false}
                onChange={this.handleChange}
                label='Trade Name'
              />
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRInput
                type='text'
                name='companyName'
                require={false}
                onChange={this.handleChange}
                label='Company Name'
              />
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRSelect
                label='Drug Type'
                require={true}
                onChange={(event) => { }}
              >
                {
                  drug_type.map((stage, key) => (
                    <option key={key}>{stage}</option>
                  ))
                }
              </CTRSelect>
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRSelect
                label='Drug Class'
                require={true}
                onChange={(event) => { }}
              >
                {
                  drug_class.map((stage, key) => (
                    <option key={key}>{stage}</option>
                  ))
                }
              </CTRSelect>
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRInput
                type='text'
                name='dose'
                require={false}
                onChange={this.handleChange}
                label='Dose'
              />
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRSelect
                label='Unit'
                require={true}
                onChange={(event) => { }}
              >
                {
                  drug_unit.map((stage, key) => (
                    <option key={key}>{stage}</option>
                  ))
                }
              </CTRSelect>
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRSelect
                label='Per'
                require={true}
                onChange={(event) => { }}
              >
                {
                  drug_unit.map((stage, key) => (
                    <option key={key}>{stage}</option>
                  ))
                }
              </CTRSelect>
            </GenericFieldContainer>

            <GenericFieldContainer>
              <CTRSelect
                label='Route'
                require={true}
                onChange={(event) => { }}
              >
                 {
                  drug_route.map((stage, key) => (
                    <option key={key}>{stage}</option>
                  ))
                }
              </CTRSelect>
            </GenericFieldContainer>

            <GenericFieldContainer>
              <FormEditor
                require={true}
                label='Schedule'
                setData={(value) => { }}
              />
            </GenericFieldContainer>

            <CTRCustomDoseTable
              heading="Dose Escalation Table"
              headers={["Dose", "Dose of Drug", "Number of Entrolled", "Number Evaluable for Toxicity"]}
              onAddRow = {(tableRows) => {}}
              onRemoveRow = {(tableRows) => {}}
              onRowUpdate = {(tableRows) => {}}
            >

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

export default AuthorDrugInformationForm;
