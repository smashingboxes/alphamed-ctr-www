import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import AuthorPharmaForm from './author-pharma-form.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({

});

const AuthorPharmaContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(AuthorPharmaForm);

export default AuthorPharmaContainer;
