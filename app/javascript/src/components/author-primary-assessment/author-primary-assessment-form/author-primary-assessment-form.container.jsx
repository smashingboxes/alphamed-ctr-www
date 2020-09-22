import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../../redux/user/user.selectors';

import AuthorPrimaryAssessmentForm from './author-primary-assessment-form.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  
});

const AuthorPrimaryAssessmentContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(AuthorPrimaryAssessmentForm);

export default AuthorPrimaryAssessmentContainer;
