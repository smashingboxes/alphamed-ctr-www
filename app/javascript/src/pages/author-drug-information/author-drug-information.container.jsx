import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCTRResult } from '../../redux/ctr-results/ctr-results.selectors';
import { selectAuthToken } from '../../redux/user/user.selectors';
import { retrieveCTRResultsStart } from '../../redux/ctr-results/ctr-results.actions';
import { retrieveCTRCommentStart } from '../../redux/ctr-comments/ctr-comments.actions';

import AuthorDrugInformationPage from './author-drug-information.page';

const mapStateToProps = createStructuredSelector({
  ctrResult: (state, ownProps) =>
    selectCTRResult(ownProps.match.params.id)(state),
  authToken: selectAuthToken
});

const mapDispatchToProps = (dispatch) => ({
  retrieveCTRResultsStart: (authToken) =>
    dispatch(retrieveCTRResultsStart({ authToken })),
  retrieveCTRCommentStart: (resultId, step) =>
    dispatch(retrieveCTRCommentStart({ resultId, step }))
});

const AuthorDrugInformationPageContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(AuthorDrugInformationPage);

export default AuthorDrugInformationPageContainer;
