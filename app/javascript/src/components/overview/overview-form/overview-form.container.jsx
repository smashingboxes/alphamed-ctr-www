import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { createCTROverviewStart } from '../../../redux/ctr-overview/ctr-overview.actions';

import OverviewForm from './overview-form.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  createCTROverviewStart: (ctrOverviewDetails) =>
    dispatch(createCTROverviewStart(ctrOverviewDetails))
});

const OverviewFormContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(OverviewForm);

export default OverviewFormContainer;
