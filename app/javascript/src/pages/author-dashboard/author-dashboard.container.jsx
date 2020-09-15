import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectAuthToken } from '../../redux/user/user.selectors';
import { retrieveCTRResultsStart } from '../../redux/ctr-results/ctr-results.actions';

import AuthorDashboardPage from './author-dashboard.page';

const mapStateToProps = createStructuredSelector({
  authToken: selectAuthToken
});

const mapDispatchToProps = (dispatch) => ({
  retrieveCTRResultsStart: (authToken) =>
    dispatch(retrieveCTRResultsStart({ authToken }))
});

const AuthorDashboardPageContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(AuthorDashboardPage);

export default AuthorDashboardPageContainer;
