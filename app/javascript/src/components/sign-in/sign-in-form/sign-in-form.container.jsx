import { compose } from 'redux';
import { connect } from 'react-redux';

import { emailSignInStart } from '../../../redux/user/user.actions';

import SignInForm from './sign-in-form.component';

const mapDispatchToProps = (dispatch) => ({
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

const SignInFormContainer = compose(connect(null, mapDispatchToProps))(
  SignInForm
);

export default SignInFormContainer;
