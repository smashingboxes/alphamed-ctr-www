import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { signOutStart } from '../../../redux/user/user.actions';

import Navbar from './navbar.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart())
});

const NavbarContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Navbar);

export default NavbarContainer;
