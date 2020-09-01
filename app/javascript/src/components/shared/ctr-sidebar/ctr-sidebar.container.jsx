import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import {
  selectCurrentUser,
  selectIsAuthenticated
} from '../../../redux/user/user.selectors';

import CTRSidebar from './ctr-sidebar.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  isAuthenticated: selectIsAuthenticated
});

const CTRSidebarContainer = compose(
  connect(mapStateToProps),
  withRouter
)(CTRSidebar);

export default CTRSidebarContainer;
