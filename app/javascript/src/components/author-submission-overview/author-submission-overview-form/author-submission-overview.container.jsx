import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../../redux/user/user.selectors';

import AuthorSubmissionOverviewForm from './author-submission-overview.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({

});

const AuthorSubmissionOverviewContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(AuthorSubmissionOverviewForm);

export default AuthorSubmissionOverviewContainer;
