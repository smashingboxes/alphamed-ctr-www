import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../../redux/user/user.selectors';

import AuthorDrugInformationForm from './author-drug-information-form.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  
});

const AuthorDrugInformationContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(AuthorDrugInformationForm);

export default AuthorDrugInformationContainer;
