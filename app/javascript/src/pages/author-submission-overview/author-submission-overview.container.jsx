import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCTRResult } from '../../redux/ctr-results/ctr-results.selectors';

import AuthorSubmissionOverviewPage from './author-submission-overview.page';

const mapStateToProps = createStructuredSelector({
  ctrResult: (state, ownProps) =>
    selectCTRResult(ownProps.match.params.id)(state)
});

const AuthorSubmissionOverviewPageContainer = compose(connect(mapStateToProps))(
  AuthorSubmissionOverviewPage
);

export default AuthorSubmissionOverviewPageContainer;
