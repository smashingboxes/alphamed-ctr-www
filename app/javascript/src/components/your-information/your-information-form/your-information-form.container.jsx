import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { createCTRYourInformationStart } from '../../../redux/ctr-your-information/ctr-your-information.actions';

import YourInformationForm from './your-information-form.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  createCTRYourInformationStart: (ctrYourInformationDetails) =>
    dispatch(createCTRYourInformationStart(ctrYourInformationDetails))
});

const YourInformationFormContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(YourInformationForm);

export default YourInformationFormContainer;
