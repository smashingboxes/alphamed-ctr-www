import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../../redux/user/user.selectors';

import AuthorAdverseEventForm from './author-adverse-event-form.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  
});

const AuthorAdverseEventContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(AuthorAdverseEventForm);

export default AuthorAdverseEventContainer;
