import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../../redux/user/user.selectors';

import SecondSidebar from './second-sidebar.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const SecondSidebarContainer = compose(
  connect(mapStateToProps),
  withRouter
)(SecondSidebar);

export default SecondSidebarContainer;
