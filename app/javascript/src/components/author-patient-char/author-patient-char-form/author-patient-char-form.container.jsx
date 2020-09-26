import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../../redux/user/user.selectors';

import AuthorPatientCharForm from './author-patient-char-form.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  
});

const AuthorPatientCharContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(AuthorPatientCharForm);

export default AuthorPatientCharContainer;
