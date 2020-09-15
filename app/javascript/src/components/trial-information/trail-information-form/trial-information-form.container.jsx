import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { createCTRTrailInformationStart } from '../../../redux/ctr-trail-information/ctr-trail-information.actions';

import TrailInformationForm from './trial-information-form.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  createCTRTrailInformationStart: (ctrDetails) =>
    dispatch(createCTRTrailInformationStart(ctrDetails))
});

const TrailInformationFormContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(TrailInformationForm);

export default TrailInformationFormContainer;
