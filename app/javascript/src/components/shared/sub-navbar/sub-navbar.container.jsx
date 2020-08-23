import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { selectCurrentUser } from '../../../redux/user/user.selectors';

import SubNavbar from './sub-navbar.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const SubNavbarContainer = compose(
  connect(mapStateToProps),
  withRouter
)(SubNavbar);

export default SubNavbarContainer;
