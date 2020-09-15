import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { createCTRAuthorSummaryStart } from '../../../redux/ctr-author-summary/ctr-author-summary.actions';

import AuthorSummaryAbstractForm from './author-summary-abstract-form.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  createCTRAuthorSummaryStart: (ctrDetails) =>
    dispatch(createCTRAuthorSummaryStart(ctrDetails))
});

const AuthorSummaryAbstractFormContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(AuthorSummaryAbstractForm);

export default AuthorSummaryAbstractFormContainer;
