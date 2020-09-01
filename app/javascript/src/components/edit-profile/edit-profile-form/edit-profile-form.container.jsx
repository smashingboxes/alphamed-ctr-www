import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { editProfileStart } from '../../../redux/user/user.actions';

import EditProfileForm from './edit-profile-form.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  editProfileStart: (userCredentials) =>
    dispatch(editProfileStart(userCredentials))
});

const EditProfileFormContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(EditProfileForm);

export default EditProfileFormContainer;
