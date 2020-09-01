import { compose } from 'redux';
import { connect } from 'react-redux';

import { signUpStart } from '../../../redux/user/user.actions';

import SignUpForm from './sign-up-form.component';

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
});

const SignUpFormContainer = compose(connect(null, mapDispatchToProps))(
  SignUpForm
);

export default SignUpFormContainer;
