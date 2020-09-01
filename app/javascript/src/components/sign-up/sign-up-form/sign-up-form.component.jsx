import React from 'react';
import validator from 'validator';

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
    const { signUpStart } = this.props;

    if (validator.isEmpty(email)) {
      this.setState({
        emailError: 'This field is mandatory.'
      });
      return;
    } else {
      if (!validator.isEmail(email)) {
        this.setState({
          emailError: 'Invalid email address.'
        });
        return;
      }
    }

    if (validator.isEmpty(password)) {
      this.setState({
        passwordError: 'This field is mandatory.'
      });
      return;
    } else {
      if (password.trim().length < 8) {
        this.setState({
          passwordError: 'Password is too short (minimum is 8 characters).'
        });
        return;
      }
    }

    if (validator.isEmpty(confirmPassword)) {
      this.setState({
        confirmPasswordError: 'This field is mandatory.'
      });
      return;
    } else {
      if (confirmPassword.trim().length < 8) {
        this.setState({
          confirmPasswordError:
            'Password is too short (minimum is 8 characters).'
        });
        return;
      }
    }

    if (password.trim() !== confirmPassword.trim()) {
      this.setState({
        confirmPasswordError: "Password doesn't match."
      });
      return;
    }

    return signUpStart({
      email,
      password,
      confirmPassword
    });
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
