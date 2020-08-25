import React from 'react';

import {
  PrimaryButtonContainer,
  HeaderContainer
} from './edit-profile-form.styles';

import FormInput from '../../shared/form-input/form-input.component';
import PrimaryButton from '../../shared/primary-button/primary-button.component';

class EditProfileForm extends React.Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    currentPassword: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
    currentPasswordError: ''
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password, confirmPassword, currentPassword } = this.state;

    console.log('Email', email);
    console.log('Password', password);
    console.log('Confirm Password', confirmPassword);
    console.log('Current Password', currentPassword);
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      currentPasswordError: ''
    });

    this.setState({ [name]: value });
  };

  render() {
    const {
      email,
      password,
      confirmPassword,
      currentPassword,
      emailError,
      passwordError,
      confirmPasswordError,
      currentPasswordError
    } = this.state;

    return (
      <div>
        <HeaderContainer>Edit Profile</HeaderContainer>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='Email'
            error={emailError}
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label="Password (leave blank if you don't want to change it)"
            error={passwordError}
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Confirm Password'
            error={confirmPasswordError}
          />
          <FormInput
            type='password'
            name='currentPassword'
            value={currentPassword}
            onChange={this.handleChange}
            label='Current Password'
            error={currentPasswordError}
          />
          <PrimaryButtonContainer>
            <PrimaryButton type='submit'>Update</PrimaryButton>
          </PrimaryButtonContainer>
        </form>
      </div>
    );
  }
}

export default EditProfileForm;
