import React from 'react';
import validator from 'validator';
import { Grid, Paper } from '@material-ui/core';

import {
  CoAuthorContainer,
  CoAuthorFormContainer,
  FormContainer,
  ButtonContainer,
  CoAuthorTableContainer
} from './co-author-information-form.styles';

import CTRInput from '../../shared/ctr-input/ctr-input.component';
import CTRComments from '../../shared/ctr-comments/ctr-comments.component';
import PrimaryButton from '../../shared/primary-button/primary-button.component';
import SecondaryButton from '../../shared/secondary-button/secondary-button.component';
import CoAuthorInformationModal from '../co-author-information-modal/co-author-information-modal.container';
import CoAuthorTable from '../co-author-table/co-author-table.component';
import ErrorButton from '../../shared/error-button/error-button.component';

class CoAuthorForm extends React.Component {
  state = {
    id: '',
    coAuthorEmail: '',
    coAuthorEmailError: '',
    ctrData: {},
    coAuthorArray: [],
    usersArray: [],
    isOpen: false
  };

  componentDidMount() {
    const { ctrResult } = this.props;

    if (ctrResult === null) return;
    if (ctrResult.length === 0) return;

    const { coauthors, _id } = ctrResult[0];

    return this.setState({
      coAuthorArray: coauthors,
      id: _id.$oid
    });
  }

  handleEditOpen = (ctrData) => {
    this.setState({
      ctrData,
      isOpen: true
    });
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { coAuthorEmail } = this.state;

    if (validator.isEmpty(coAuthorEmail)) {
      this.setState({
        coAuthorEmailError: 'This field is mandatory.'
      });
      return;
    } else {
      if (!validator.isEmail(coAuthorEmail)) {
        this.setState({
          coAuthorEmailError: 'Invalid email address.'
        });
        return;
      }
    }

    this.handleOpen();
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      coAuthorEmailError: ''
    });

    this.setState({ [name]: value });
  };

  handleSave = () => {
    const { createCTRCoAuthorStart, user } = this.props;
    const { coAuthorArray, id } = this.state;

    return createCTRCoAuthorStart({
      authToken: user.authentication_token,
      coAuthors: coAuthorArray,
      id,
      type: 'save'
    });
  };

  handlePrevious = () =>
    (window.location.href = `/submission/results/your-information/${this.state.id}`);

  render() {
    const {
      coAuthorEmail,
      coAuthorEmailError,
      isOpen,
      coAuthorArray,
      usersArray,
      ctrData
    } = this.state;
    const { ctrResult } = this.props;

    return (
      <Paper elevation={0}>
        <CoAuthorContainer>Add Co-Author</CoAuthorContainer>
        <form onSubmit={this.handleSubmit}>
          <CoAuthorFormContainer>
            <FormContainer>
              <CTRInput
                type='text'
                name='coAuthorEmail'
                require={true}
                value={coAuthorEmail}
                onChange={this.handleChange}
                label='Email'
                error={coAuthorEmailError}
              />
            </FormContainer>
            <Grid container justify='center' alignItems='center'>
              <ButtonContainer>
                <PrimaryButton type='submit'>Add Co-Author</PrimaryButton>
              </ButtonContainer>
            </Grid>
          </CoAuthorFormContainer>
        </form>
        <CoAuthorContainer>Order of Authors</CoAuthorContainer>
        <CoAuthorTableContainer>
          <CoAuthorTable
            coAuthorArray={coAuthorArray}
            ctrResult={ctrResult}
            handleOpen={this.handleEditOpen}
          />
        </CoAuthorTableContainer>
        <CTRComments />
        <CoAuthorInformationModal
          ctrData={ctrData}
          coAuthorEmail={coAuthorEmail}
          isOpen={isOpen}
          handleClose={this.handleClose}
          ctrResult={ctrResult}
          coAuthorArray={coAuthorArray}
          usersArray={usersArray}
        />
        <Grid container justify='center' alignItems='center'>
          <ButtonContainer>
            <ErrorButton type='button' onClick={this.handlePrevious}>
              Previous
            </ErrorButton>
          </ButtonContainer>
          <ButtonContainer>
            <SecondaryButton type='button' onClick={this.handleSave}>
              Save
            </SecondaryButton>
          </ButtonContainer>
        </Grid>
      </Paper>
    );
  }
}

export default CoAuthorForm;
