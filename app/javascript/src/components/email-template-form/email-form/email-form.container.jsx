import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { createCTROverviewStart } from '../../../redux/ctr-overview/ctr-overview.actions';

import EmailForm from './email-form.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  createCTROverviewStart: (ctrOverviewDetails) =>
    dispatch(createCTROverviewStart(ctrOverviewDetails))
});

const EmailFormContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(EmailForm);

export default EmailFormContainer;
