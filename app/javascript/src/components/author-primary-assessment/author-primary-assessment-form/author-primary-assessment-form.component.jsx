import React from 'react';
import validator from 'validator';
import { Grid, Paper } from '@material-ui/core';

import {
  ButtonContainer,
  GridContainer,
  FormEditorLabel
} from './author-primary-assessment-form.styles';

import { FormSelectContainer } from '../../shared/ctr-select/ctr-select.styles';

import {
  GenericHeaderContainer,
  GenericFieldContainer,
  GenericFormContainer,
  GenericLabelContainer
} from '../../shared/form-container/form-container.styles';

import CTRCustomTab from '../../shared/ctr-custom-tab/ctr-custom-tab.component';
import CTRSelect from '../../shared/ctr-select/ctr-select.component';
import CTRInput from '../../shared/ctr-input/ctr-input.component';
import CTRComments from '../../shared/ctr-comments/ctr-comments.component';
import FormEditor from '../../shared/form-editor/form-editor.component';
import SecondaryButton from '../../shared/secondary-button/secondary-button.component';
import CTRCustomInputPill from '../../shared/ctr-custom-input-pill/ctr-custom-input-pill.component';
import CTRFormContainer from '../../shared/ctr-form-container/ctr-form-container.component';
import CTRSpacer from '../../shared/ctr-spacer/ctr-spacer.component';

class AuthorPrimaryAssessmentForm extends React.Component {
  state = {
    arms: [],
    selectedArmIndex: 0,
    selectedOrderIndex: 0,
    selectedAssessmentIndex: 0
  };

  componentDidMount() {
    const { ctrResult } = this.props;
    this.createInitialForm();
  }

  // Creates initial arm and table
  createInitialForm = () => {
    let newArm = this.createNewArm('Control', true);
    let newOrder = this.createNewOrder('Primary', true);
    let newAssessment = this.createNewAssessment('New assessment', true);

    newArm.orders.push(newOrder);
    newOrder.assessments.push(newAssessment);

    this.setState({
      arms: [...this.state.arms, newArm]
    });
  };

  // creates arm object
  createNewArm = (value, isSelected) => {
    return {
      value: value,
      isSelected: isSelected,
      orders: []
    };
  };

  createNewOrder = (value, isSelected) => {
    return {
      value: value,
      isSelected: isSelected,
      assessments: []
    };
  };

  createNewAssessment = (value, isSelected) => {
    return {
      value: value,
      isSelected: isSelected,
      details: {
        title: value,
        screened: '',
        enrolled: '',
        eval_toxicity: '',
        eval_effiacy: '',
        eval_method: '',

        cr: '',
        pr: '',
        sd: '',
        pd: '',
        other: '',
        cr_percent: '',
        pr_percent: '',
        sd_percent: '',
        pd_percent: '',
        other_percent: '',

        pes: '',
        ttp: '',
        os: '',
        response_duration: '',
        duration_treatment: '',
        pes_length: '',
        ttp_length: '',
        os_length: '',
        response_duration_length: '',
        duration_treatment_length: '',
        ci_1: '',
        ci_2: '',
        ci_3: '',

        outcome_notes: ''
      }
    };
  };

  handleOnAddArm = () => {
    let currentArms = this.deselectOtherArms();
    let newArm = this.createNewArm('New arm', true);
    let updatedArms = [...currentArms, newArm];

    this.setState({
      arms: updatedArms,
      selectedArmIndex: updatedArms.length - 1
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
      selectedArmIndex: index
    });
  };

  deselectOtherArms = () => {
    return this.state.arms.map((arm) => {
      let currentArm = { ...arm };
      currentArm.isSelected = false;
      return currentArm;
    });
  };

  handleOnAddOrder = () => {
    const { arms, selectedArmIndex } = this.state;

    let currentArm = { ...arms[selectedArmIndex] };
    let newOrder = this.createNewOrder('Secondary', true);
    let updatedOrder = this.deselectOtherOrder();
    updatedOrder.push(newOrder);
    currentArm.orders = updatedOrder;

    const allArms = [...arms];
    allArms[selectedArmIndex] = currentArm;

    this.setState({
      arms: [...allArms],
      selectedOrderIndex: currentArm.orders.length - 1
    });
  };

  deselectOtherOrder = () => {
    const { arms, selectedArmIndex } = this.state;
    return arms[selectedArmIndex].orders.map((order) => {
      let currentOrder = { ...order };
      currentOrder.isSelected = false;
      return currentOrder;
    });
  };

  handleOrderChange = (index) => {
    const { arms, selectedArmIndex } = this.state;
    let currentOrders = this.deselectOtherOrder();
    currentOrders[index].isSelected = true;

    let currentArm = { ...arms[selectedArmIndex] };
    currentArm.orders = currentOrders;

    const allArms = [...arms];
    allArms[selectedArmIndex] = currentArm;

    this.setState({
      arms: [...allArms],
      selectedOrderIndex: index
    });
  };

  handleOnAddAssessment = () => {
    const { arms, selectedArmIndex, selectedOrderIndex } = this.state;

    let currentArm = { ...arms[selectedArmIndex] };
    let newAssessment = this.createNewAssessment('New Assessment', true);
    let updatedAssessments = this.deselectOtherAssessments();
    updatedAssessments.push(newAssessment);
    currentArm.orders[selectedOrderIndex].assessments = updatedAssessments;

    const allArms = [...arms];
    allArms[selectedArmIndex] = currentArm;

    this.setState({
      arms: [...allArms],
      selectedAssessmentIndex:
        currentArm.orders[selectedOrderIndex].assessments.length - 1
    });
  };

  deselectOtherAssessments = () => {
    const { arms, selectedArmIndex, selectedOrderIndex } = this.state;
    return arms[selectedArmIndex].orders[selectedOrderIndex].assessments.map(
      (assessment) => {
        let currentAssessment = { ...assessment };
        currentAssessment.isSelected = false;
        return currentAssessment;
      }
    );
  };

  handleAssessmentChange = (index) => {
    const { arms, selectedArmIndex, selectedOrderIndex } = this.state;
    let currentAssessments = this.deselectOtherAssessments();
    currentAssessments[index].isSelected = true;

    let currentArm = { ...arms[selectedArmIndex] };
    currentArm.orders[selectedOrderIndex].assessments = currentAssessments;

    const allArms = [...arms];
    allArms[selectedArmIndex] = currentArm;

    this.setState({
      arms: [...allArms],
      selectedAssessmentIndex: index
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.arms);
  };

  handleChange = ({ name, value }) => {
    const {
      arms,
      selectedArmIndex,
      selectedOrderIndex,
      selectedAssessmentIndex
    } = this.state;

    let currentArms = [...arms];
    currentArms[selectedArmIndex].orders[selectedOrderIndex].assessments[
      selectedAssessmentIndex
    ].details[name] = value;

    if(name === "title"){
      currentArms[selectedArmIndex].orders[selectedOrderIndex].assessments[
        selectedAssessmentIndex
      ].value = value
    }

    this.setState({ arms: currentArms });
  };

  render() {
    const {
      arms,
      selectedArmIndex,
      selectedOrderIndex,
      selectedAssessmentIndex
    } = this.state;

    return (
      <Paper elevation={0}>
        <GenericHeaderContainer>
          Primary Assessment Method
        </GenericHeaderContainer>

        <CTRCustomTab label={'Phase'} initialValue='Phase 1' />
        <CTRCustomTab
          label={'Arms'}
          isAppendable={true}
          appendLabel='Arm'
          tabItems={arms}
          onTabAdd={this.handleOnAddArm}
          onTabSelectChange={this.handleArmChange}
          //onTabItemRemoved={() => {}}
        />
        <CTRCustomTab
          label={'Order'}
          isAppendable={true}
          initialValue='Primary'
          appendLabel='Secondary Assessment Methods'
          tabItems={
            arms && arms[selectedArmIndex] && arms[selectedArmIndex].orders
          }
          onTabAdd={this.handleOnAddOrder}
          onTabSelectChange={this.handleOrderChange}
          //onTabItemRemoved={() => {}}
        />
        <CTRCustomTab
          label={'Assessments'}
          isAppendable={true}
          appendLabel='Assessment'
          tabItems={
            arms &&
            arms[selectedArmIndex] &&
            arms[selectedArmIndex].orders &&
            arms[selectedArmIndex].orders[selectedOrderIndex].assessments
          }
          onTabAdd={this.handleOnAddAssessment}
          onTabSelectChange={this.handleAssessmentChange}
        />

        <form onSubmit={this.handleSubmit}>
          <GenericFormContainer>
            <GenericFieldContainer>
              <CTRInput
                type='text'
                require={false}
                name='title'
                value={
                  arms &&
                  arms[selectedArmIndex] &&
                  arms[selectedArmIndex].orders[selectedOrderIndex] &&
                  arms[selectedArmIndex].orders[selectedOrderIndex].assessments[
                    selectedAssessmentIndex
                  ] &&
                  arms[selectedArmIndex].orders[selectedOrderIndex].assessments[
                    selectedAssessmentIndex
                  ].details.title
                }
                onChange={(e) => this.handleChange(e.target)}
                label='Title'
              />
            </GenericFieldContainer>

            <CTRFormContainer label='Number of Patients'>
              <CTRCustomInputPill
                label='Screened'
                width={400}
                name='screened'
                value={
                  arms &&
                  arms[selectedArmIndex] &&
                  arms[selectedArmIndex].orders[selectedOrderIndex] &&
                  arms[selectedArmIndex].orders[selectedOrderIndex].assessments[
                    selectedAssessmentIndex
                  ] &&
                  arms[selectedArmIndex].orders[selectedOrderIndex].assessments[
                    selectedAssessmentIndex
                  ].details.screened
                }
                onChange={(e) => this.handleChange(e.target)}
              />
              <CTRCustomInputPill
                label='Enrolled'
                width={400}
                name='enrolled'
                value={
                  arms &&
                  arms[selectedArmIndex] &&
                  arms[selectedArmIndex].orders[selectedOrderIndex] &&
                  arms[selectedArmIndex].orders[selectedOrderIndex].assessments[
                    selectedAssessmentIndex
                  ] &&
                  arms[selectedArmIndex].orders[selectedOrderIndex].assessments[
                    selectedAssessmentIndex
                  ].details.enrolled
                }
                onChange={(e) => this.handleChange(e.target)}
              />
              <CTRCustomInputPill
                label='Evaluable for Toxicity'
                width={400}
                name='eval_toxicity'
                value={
                  arms &&
                  arms[selectedArmIndex] &&
                  arms[selectedArmIndex].orders[selectedOrderIndex] &&
                  arms[selectedArmIndex].orders[selectedOrderIndex].assessments[
                    selectedAssessmentIndex
                  ] &&
                  arms[selectedArmIndex].orders[selectedOrderIndex].assessments[
                    selectedAssessmentIndex
                  ].details.eval_toxicity
                }
                onChange={(e) => this.handleChange(e.target)}
              />
              <CTRCustomInputPill
                label='Evaluable for Efficacy'
                width={400}
                name='eval_effiacy'
                value={
                  arms &&
                  arms[selectedArmIndex] &&
                  arms[selectedArmIndex].orders[selectedOrderIndex] &&
                  arms[selectedArmIndex].orders[selectedOrderIndex].assessments[
                    selectedAssessmentIndex
                  ] &&
                  arms[selectedArmIndex].orders[selectedOrderIndex].assessments[
                    selectedAssessmentIndex
                  ].details.eval_effiacy
                }
                onChange={(e) => this.handleChange(e.target)}
              />
            </CTRFormContainer>

            <GenericFieldContainer>
              <CTRSelect
                label='Evaluation Method'
                require={true}
                name='eval_method'
                value={
                  arms &&
                  arms[selectedArmIndex] &&
                  arms[selectedArmIndex].orders[selectedOrderIndex] &&
                  arms[selectedArmIndex].orders[selectedOrderIndex].assessments[
                    selectedAssessmentIndex
                  ] &&
                  arms[selectedArmIndex].orders[selectedOrderIndex].assessments[
                    selectedAssessmentIndex
                  ].details.eval_method
                }
                onChange={(e) => this.handleChange(e.target)}
              >
                <option key={2}>Test</option>
              </CTRSelect>
            </GenericFieldContainer>

            <CTRSpacer top={50} />

            <Grid container justify='center'>
              <Grid item md>
                <CTRCustomInputPill
                  label='CR'
                  width={300}
                  placeHolder='N='
                  name='cr'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details.cr
                  }
                  onChange={(e) => this.handleChange(e.target)}
                />
                <CTRCustomInputPill
                  label='PR'
                  width={300}
                  placeHolder='N='
                  name='pr'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details.pr
                  }
                  onChange={(e) => this.handleChange(e.target)}
                />
                <CTRCustomInputPill
                  label='SD'
                  width={300}
                  placeHolder='N='
                  name='sd'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details.sd
                  }
                  onChange={(e) => this.handleChange(e.target)}
                />
                <CTRCustomInputPill
                  label='PD'
                  width={300}
                  placeHolder='N='
                  name='pd'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details.pd
                  }
                  onChange={(e) => this.handleChange(e.target)}
                />
                <CTRCustomInputPill
                  label='Other'
                  width={300}
                  placeHolder='N='
                  name='other'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details.other
                  }
                  onChange={(e) => this.handleChange(e.target)}
                />
              </Grid>
              <Grid item md>
                <CTRCustomInputPill
                  label='%'
                  width={180}
                  name='cr_percent'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details.cr_percent
                  }
                  onChange={(e) => this.handleChange(e.target)}
                />
                <CTRCustomInputPill
                  label='%'
                  width={180}
                  name='pr_percent'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details.pr_percent
                  }
                  onChange={(e) => this.handleChange(e.target)}
                />
                <CTRCustomInputPill
                  label='%'
                  width={180}
                  name='sd_percent'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details.sd_percent
                  }
                  onChange={(e) => this.handleChange(e.target)}
                />
                <CTRCustomInputPill
                  label='%'
                  width={180}
                  name='pd_percent'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details.pd_percent
                  }
                  onChange={(e) => this.handleChange(e.target)}
                />
                <CTRCustomInputPill
                  label='%'
                  width={180}
                  name='other_percent'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details
                      .other_percent
                  }
                  onChange={(e) => this.handleChange(e.target)}
                />
              </Grid>
            </Grid>

            <CTRSpacer top={30} />

            <Grid container>
              <Grid item xs>
                <CTRCustomInputPill
                  label='PES'
                  width={400}
                  name='pes'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details.pes
                  }
                  onChange={(e) => this.handleChange(e.target)}
                />
                <CTRCustomInputPill
                  label='TTP'
                  width={400}
                  name='ttp'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details.ttp
                  }
                  onChange={(e) => this.handleChange(e.target)}
                />
                <CTRCustomInputPill
                  label='OS'
                  width={400}
                  name='os'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details.os
                  }
                  onChange={(e) => this.handleChange(e.target)}
                />
                <CTRCustomInputPill
                  label='Response Duration'
                  width={400}
                  name='response_duration'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details
                      .response_duration
                  }
                  onChange={(e) => this.handleChange(e.target)}
                />
                <CTRCustomInputPill
                  label='Duration of Treatmeant'
                  width={400}
                  name='duration_treatment'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details
                      .duration_treatment
                  }
                  onChange={(e) => this.handleChange(e.target)}
                />
              </Grid>
              <Grid item xs>
                <FormSelectContainer
                  width={500}
                  name='pes_length'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details.pes_length
                  }
                  onChange={(e) => this.handleChange(e.target)}
                >
                  <option key={2}>Test</option>
                </FormSelectContainer>
                <FormSelectContainer
                  style={{ display: 'block' }}
                  width={200}
                  name='ttp_length'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details.ttp_length
                  }
                  onChange={(e) => this.handleChange(e.target)}
                >
                  <option key={2}>Test</option>
                </FormSelectContainer>
                <FormSelectContainer
                  style={{ display: 'block' }}
                  width={200}
                  name='os_length'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details.os_length
                  }
                  onChange={(e) => this.handleChange(e.target)}
                >
                  <option key={2}>Test</option>
                </FormSelectContainer>
                <FormSelectContainer
                  style={{ display: 'block' }}
                  width={200}
                  name='response_duration_length'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details
                      .response_duration_length
                  }
                  onChange={(e) => this.handleChange(e.target)}
                >
                  <option key={2}>Test</option>
                </FormSelectContainer>
                <FormSelectContainer
                  style={{ display: 'block' }}
                  width={200}
                  name='duration_treatment_length'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details
                      .duration_treatment_length
                  }
                  onChange={(e) => this.handleChange(e.target)}
                >
                  <option key={2}>Test</option>
                </FormSelectContainer>
              </Grid>
              <Grid item xs>
                <CTRCustomInputPill
                  label='CI'
                  width={200}
                  name='ci_1'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details.ci_1
                  }
                  onChange={(e) => this.handleChange(e.target)}
                />
                <CTRCustomInputPill
                  label='CI'
                  width={200}
                  name='ci_2'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details.ci_2
                  }
                  onChange={(e) => this.handleChange(e.target)}
                />
                <CTRCustomInputPill
                  label='CI'
                  width={200}
                  name='ci_3'
                  value={
                    arms &&
                    arms[selectedArmIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex] &&
                    arms[selectedArmIndex].orders[selectedOrderIndex]
                      .assessments[selectedAssessmentIndex].details.ci_3
                  }
                  onChange={(e) => this.handleChange(e.target)}
                />
              </Grid>
            </Grid>

            <GenericFieldContainer style={{ marginTop: 30 }}>
              <GridContainer container alignItems='start' spacing={1}>
                <Grid item xs={3}>
                  <FormEditorLabel>Outcome Notes</FormEditorLabel>
                </Grid>
                <Grid container item xs={9}>
                  <FormEditor
                    require={true}
                    setData={(value) =>
                      this.handleChange({ name: 'outcome_notes', value })
                    }
                    value={
                      arms &&
                      arms[selectedArmIndex] &&
                      arms[selectedArmIndex].orders[selectedOrderIndex] &&
                      arms[selectedArmIndex].orders[selectedOrderIndex]
                        .assessments[selectedAssessmentIndex] &&
                      arms[selectedArmIndex].orders[selectedOrderIndex]
                        .assessments[selectedAssessmentIndex].details
                        .outcome_notes
                    }
                  />
                </Grid>
              </GridContainer>
            </GenericFieldContainer>
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

export default AuthorPrimaryAssessmentForm;
