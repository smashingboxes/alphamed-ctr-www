import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { createCTRCommentStart } from '../../../redux/ctr-comments/ctr-comments.actions';
import { selectAuthToken } from '../../../redux/user/user.selectors';

import CTRComments from './ctr-comments.component';

const mapStateToProps = createStructuredSelector({
  authToken: selectAuthToken
});

const mapDispatchToProps = (dispatch) => ({
  createCTRCommentStart: (comments) => dispatch(createCTRCommentStart(comments))
});

const CTRCommentsContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(CTRComments);

export default CTRCommentsContainer;
