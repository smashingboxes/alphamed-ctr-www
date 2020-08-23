import { compose } from 'redux';
import { connect } from 'react-redux';

import SignInForm from './sign-in-form.component';

import { emailSignInStart } from '../../../redux/user/user.actions';

const mapDispatchToProps = (dispatch) => ({
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

const SignInFormContainer = compose(connect(null, mapDispatchToProps))(
  SignInForm
);

export default SignInFormContainer;
