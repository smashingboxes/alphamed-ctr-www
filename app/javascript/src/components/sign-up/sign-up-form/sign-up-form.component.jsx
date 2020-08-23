import React from 'react';

import { PrimaryButtonContainer } from './sign-up-form.styles';

import FormInput from '../../shared/form-input/form-input.component';
import PrimaryButton from '../../shared/primary-button/primary-button.component';

class SignUpForm extends React.Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: ''
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password, confirmPassword } = this.state;

    console.log('Email', email);
    console.log('Password', password);
    console.log('Confirm Password', confirmPassword);
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      emailError: '',
      passwordError: '',
      confirmPasswordError: ''
    });

    this.setState({ [name]: value });
  };

  render() {
    const {
      email,
      password,
      confirmPassword,
      emailError,
      passwordError,
      confirmPasswordError
    } = this.state;

    return (
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
          label='Password'
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
        <PrimaryButtonContainer>
          <PrimaryButton type='submit'>Register</PrimaryButton>
        </PrimaryButtonContainer>
      </form>
    );
  }
}

export default SignUpForm;
