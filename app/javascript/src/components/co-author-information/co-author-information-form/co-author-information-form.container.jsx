import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { createCTRCoAuthorStart } from '../../../redux/ctr-co-author/ctr-co-author.actions';

import CoAuthorForm from './co-author-information-form.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  createCTRCoAuthorStart: (ctrCoAuthorDetails) =>
    dispatch(createCTRCoAuthorStart(ctrCoAuthorDetails))
});

const CoAuthorFormContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(CoAuthorForm);

export default CoAuthorFormContainer;
