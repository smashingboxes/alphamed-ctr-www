import React from 'react';
import validator from 'validator';
import cuid from 'cuid';
import {
  Backdrop,
  Fade,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Divider
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import {
  ModalContainer,
  PaperContainer,
  CoAuthorContainer,
  CoAuthorFormContainer,
  FormContainer,
  RemoveButton,
  AddButtonContainer,
  InstitutionContainer,
  AddButton,
  InstitutionFormContainer,
  CheckboxContainer,
  ButtonContainer,
  ButtonMarginLeftContainer
} from './co-author-information-modal.styles';

import CTRInput from '../../shared/ctr-input/ctr-input.component';
import PrimaryButton from '../../shared/primary-button/primary-button.component';
import SecondaryButton from '../../shared/secondary-button/secondary-button.component';
import ErrorButton from '../../shared/error-button/error-button.component';

class CoAuthorInformationModal extends React.Component {
  state = {
    id: '',
    coAuthorId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    institutions: [''],
    principalInvestigator: false,
    correspondingAuthor: false,
    firstNameError: false,
    middleNameError: false,
    lastNameError: false,
    institutionsError: false
  };

  componentDidMount() {
    const { ctrResult } = this.props;

    if (ctrResult === null) return;
    if (ctrResult.length === 0) return;

    const { coauthors, _id } = ctrResult[0];

    return this.setState({
      id: _id.$oid,
      users: coauthors.users === undefined ? [] : coauthors.users,
      coauthors
    });
  }

  componentDidUpdate = (prevProps) => {
    const { ctrData, coAuthorEmail, coAuthorArray } = this.props;

    if (ctrData !== prevProps.ctrData) {
      this.setState({
        firstName: ctrData.first_name ? ctrData.first_name : '',
        middleName: ctrData.middle_name ? ctrData.middle_name : '',
        lastName: ctrData.last_name ? ctrData.last_name : '',
        institutions: ctrData.institutions ? ctrData.institutions : [''],
        coAuthorId: ctrData.id ? ctrData.id : ''
      });
    }

    if (coAuthorEmail !== prevProps.coAuthorEmail) {
      const filteredAuthor = coAuthorArray.filter(
        (data) => data.email === coAuthorEmail
      );

      this.setState({
        firstName:
          filteredAuthor.length !== 0 ? filteredAuthor[0].first_name : '',
        middleName:
          filteredAuthor.length !== 0 ? filteredAuthor[0].middle_name : '',
        lastName:
          filteredAuthor.length !== 0 ? filteredAuthor[0].last_name : '',
        institutions:
          filteredAuthor.length !== 0 ? filteredAuthor[0].institutions : [''],
        coAuthorId: filteredAuthor.length !== 0 ? filteredAuthor[0].id : ''
      });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      firstNameError: '',
      middleNameError: '',
      lastNameError: '',
      institutionsError: ''
    });

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      firstName,
      middleName,
      lastName,
      institutions,
      principalInvestigator,
      correspondingAuthor,
      id,
      coAuthorId
    } = this.state;
    const {
      createCTRCoAuthorStart,
      user,
      coAuthorEmail,
      handleClose
    } = this.props;
    let { coAuthorArray, usersArray } = this.props;

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

    if (institutions.length === 0 || institutions[0] === '') {
      this.setState({
        institutionsError: 'This field is mandatory.'
      });
      return;
    }

    let coAuthorData = {
      email: coAuthorEmail,
      order: coAuthorArray.length,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      ca: correspondingAuthor,
      pi: principalInvestigator,
      institutions,
      id: coAuthorId ? coAuthorId : cuid()
    };

    if (coAuthorId) {
      let objIndex = coAuthorArray.findIndex((obj) => obj.id === coAuthorId);

      coAuthorArray[objIndex].email = coAuthorEmail;
      coAuthorArray[objIndex].order = coAuthorArray.length;
      coAuthorArray[objIndex].first_name = firstName;
      coAuthorArray[objIndex].middle_name = middleName;
      coAuthorArray[objIndex].last_name = lastName;
      coAuthorArray[objIndex].ca = correspondingAuthor;
      coAuthorArray[objIndex].pi = principalInvestigator;
      coAuthorArray[objIndex].institutions = institutions;
    } else {
      coAuthorArray.push(coAuthorData);
      usersArray.push(coAuthorData);
    }

    this.setState({
      coAuthorId: '',
      firstName: '',
      middleName: '',
      lastName: '',
      institutions: ['']
    });

    handleClose();

    return createCTRCoAuthorStart({
      authToken: user.authentication_token,
      coAuthors: coAuthorArray,
      users: usersArray,
      id,
      type: 'add'
    });
  };

  handleDelete = (authorId) => {
    const {
      coAuthorArray,
      usersArray,
      handleClose,
      createCTRCoAuthorStart,
      user
    } = this.props;
    const { id } = this.state;

    const newCoAuthorArray = coAuthorArray.filter(
      (data) => data.id !== authorId
    );
    const newUsersArray = usersArray.filter((data) => data.id !== authorId);

    handleClose();

    return createCTRCoAuthorStart({
      authToken: user.authentication_token,
      coAuthors: newCoAuthorArray,
      users: newUsersArray,
      id,
      type: 'delete'
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

  render() {
    const {
      coAuthorId,
      firstName,
      middleName,
      lastName,
      institutions,
      principalInvestigator,
      correspondingAuthor,
      firstNameError,
      middleNameError,
      lastNameError,
      institutionsError
    } = this.state;
    const { isOpen, handleClose } = this.props;

    return (
      <div>
        <ModalContainer
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={isOpen}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={isOpen}>
            <PaperContainer>
              <CoAuthorContainer>Co-Author Information</CoAuthorContainer>
              <CoAuthorFormContainer>
                <form onSubmit={this.handleSubmit}>
                  <input type='hidden' value={coAuthorId} />
                  <FormContainer>
                    <CTRInput
                      style={{ margin: '0px', padding: '10px 30px' }}
                      left={2}
                      right={10}
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
                      style={{ margin: '0px', padding: '10px 30px' }}
                      left={2}
                      right={10}
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
                      style={{ margin: '0px', padding: '10px 30px' }}
                      left={2}
                      right={10}
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
                    {institutions.map((institution, index) => (
                      <Grid container>
                        <Grid
                          style={{ paddingLeft: '30px' }}
                          item
                          xs={11}
                          key={index}
                        >
                          <CTRInput
                            style={{ margin: '0px', padding: '10px 0px' }}
                            left={2}
                            right={10}
                            type='text'
                            name={`institution-${index}`}
                            require={index === 0 ? true : false}
                            display={index === 0 ? false : true}
                            value={institution}
                            onChange={(e) =>
                              this.handleChangeInstitution(e, index)
                            }
                            label={
                              index === 0 ? 'Institution(s)' : 'Institution(s)*'
                            }
                            error={institutionsError}
                          />
                        </Grid>
                        <Grid style={{ padding: '25px 10px' }} item xs={1}>
                          <RemoveButton
                            onClick={() => this.removeInstitutionField(index)}
                            aria-label='delete'
                            size='small'
                          >
                            <RemoveIcon fontSize='small' />
                          </RemoveButton>
                        </Grid>
                      </Grid>
                    ))}
                    <AddButtonContainer onClick={this.addInstitutionField}>
                      <AddButton>
                        <AddIcon fontSize='small' />
                      </AddButton>
                      <Typography color='primary'>
                        Add another institution
                      </Typography>
                    </AddButtonContainer>
                  </FormContainer>

                  <CheckboxContainer style={{ marginTop: '20px' }}>
                    <Grid item xs={7}>
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
                    <Grid item xs={7}>
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
                  <Divider />
                  <ButtonContainer>
                    <ButtonMarginLeftContainer>
                      <SecondaryButton type='button' onClick={handleClose}>
                        Cancel
                      </SecondaryButton>
                    </ButtonMarginLeftContainer>
                    <ButtonMarginLeftContainer>
                      <PrimaryButton type='submit'>Save</PrimaryButton>
                    </ButtonMarginLeftContainer>
                    <ButtonMarginLeftContainer>
                      <ErrorButton
                        type='button'
                        onClick={() => this.handleDelete(coAuthorId)}
                      >
                        Delete
                      </ErrorButton>
                    </ButtonMarginLeftContainer>
                  </ButtonContainer>
                </form>
              </CoAuthorFormContainer>
            </PaperContainer>
          </Fade>
        </ModalContainer>
      </div>
    );
  }
}

export default CoAuthorInformationModal;
