import React from 'react';

import { PrimaryButtonContainer } from './forgot-password-form.styles';

import FormInput from '../../shared/form-input/form-input.component';
import PrimaryButton from '../../shared/primary-button/primary-button.component';

class ForgotPasswordForm extends React.Component {
  state = {
    email: '',
    emailError: ''
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email } = this.state;

    console.log('Email', email);
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      emailError: ''
    });

    this.setState({ [name]: value });
  };

  render() {
    const { email, emailError } = this.state;

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
        <PrimaryButtonContainer>
          <PrimaryButton type='submit'>Reset Password</PrimaryButton>
        </PrimaryButtonContainer>
      </form>
    );
  }
}

export default ForgotPasswordForm;
