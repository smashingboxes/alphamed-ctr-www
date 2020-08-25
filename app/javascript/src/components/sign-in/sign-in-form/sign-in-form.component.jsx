import React from 'react';

import {
  PrimaryButtonContainer,
  ForgotPasswordLink
} from './sign-in-form.styles';

import FormInput from '../../shared/form-input/form-input.component';
import PrimaryButton from '../../shared/primary-button/primary-button.component';

class SignInForm extends React.Component {
  state = {
    email: '',
    password: '',
    emailError: '',
    passwordError: ''
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    const { emailSignInStart } = this.props;

    emailSignInStart(email, password);
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      emailError: '',
      passwordError: ''
    });

    this.setState({ [name]: value });
  };

  render() {
    const { email, password, emailError, passwordError } = this.state;

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
        <PrimaryButtonContainer>
          <PrimaryButton type='submit'>Sign In</PrimaryButton>
          <ForgotPasswordLink href='/forgot-password'>
            Forgot Password?
          </ForgotPasswordLink>
        </PrimaryButtonContainer>
      </form>
    );
  }
}

export default SignInForm;
