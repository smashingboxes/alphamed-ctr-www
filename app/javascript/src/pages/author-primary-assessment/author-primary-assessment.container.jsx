import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCTRResult } from '../../redux/ctr-results/ctr-results.selectors';

import AuthorPrimaryAssessmentPage from './author-primary-assessment.page';

const mapStateToProps = createStructuredSelector({
  ctrResult: (state, ownProps) =>
    selectCTRResult(ownProps.match.params.id)(state)
});

const AuthorPrimaryAssessmentPageContainer = compose(connect(mapStateToProps))(
  AuthorPrimaryAssessmentPage
);

export default AuthorPrimaryAssessmentPageContainer;
