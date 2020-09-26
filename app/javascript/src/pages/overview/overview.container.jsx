import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCTRResult } from '../../redux/ctr-results/ctr-results.selectors';
import { selectAuthToken } from '../../redux/user/user.selectors';
import { retrieveCTRResultsStart } from '../../redux/ctr-results/ctr-results.actions';

import OverviewPage from './overview.page';

const mapStateToProps = createStructuredSelector({
  ctrResult: (state, ownProps) =>
    selectCTRResult(ownProps.match.params.id)(state),
  authToken: selectAuthToken
});

const mapDispatchToProps = (dispatch) => ({
  retrieveCTRResultsStart: (authToken) =>
    dispatch(retrieveCTRResultsStart({ authToken }))
});

const OverviewPageContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(OverviewPage);

export default OverviewPageContainer;
