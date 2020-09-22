import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../../redux/user/user.selectors';

import AuthorFormsForm from './author-forms-form.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({

});

const AuthorFormsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(AuthorFormsForm);

export default AuthorFormsContainer;
