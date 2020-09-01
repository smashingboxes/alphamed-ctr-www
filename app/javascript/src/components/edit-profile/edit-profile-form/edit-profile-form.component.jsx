import React from 'react';
import validator from 'validator';

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

  componentDidMount() {
    const { email } = this.props.user;

    this.setState({
      email
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password, confirmPassword, currentPassword } = this.state;
    const { editProfileStart, user } = this.props;

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

    if (validator.isEmpty(currentPassword)) {
      this.setState({
        currentPasswordError: 'This field is mandatory.'
      });
      return;
    } else {
      if (currentPassword.trim().length < 8) {
        this.setState({
          currentPasswordError:
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

    return editProfileStart({
      authToken: user.authentication_token,
      email,
      password,
      confirmPassword,
      currentPassword
    });
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
