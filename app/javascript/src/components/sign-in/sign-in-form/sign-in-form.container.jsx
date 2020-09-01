import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { emailSignInStart } from '../../../redux/user/user.actions';
import { selectCurrentUser } from '../../../redux/user/user.selectors';

import SignInForm from './sign-in-form.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

const SignInFormContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(SignInForm);

export default SignInFormContainer;
