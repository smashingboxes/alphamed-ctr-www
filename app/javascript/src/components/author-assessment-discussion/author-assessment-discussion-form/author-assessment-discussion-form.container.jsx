import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../../redux/user/user.selectors';

import AuthorAssessmentDiscussionForm from './author-assessment-discussion-form.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({

});

const AuthorAssessmentDiscussionContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(AuthorAssessmentDiscussionForm);

export default AuthorAssessmentDiscussionContainer;
