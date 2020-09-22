import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCTRResult } from '../../redux/ctr-results/ctr-results.selectors';

import AuthorAssessmentDiscussionPage from './author-assessment-discussion.page';

const mapStateToProps = createStructuredSelector({
  ctrResult: (state, ownProps) =>
    selectCTRResult(ownProps.match.params.id)(state)
});

const AuthorAssessmentDiscussionPageContainer = compose(connect(mapStateToProps))(
  AuthorAssessmentDiscussionPage
);

export default AuthorAssessmentDiscussionPageContainer;
