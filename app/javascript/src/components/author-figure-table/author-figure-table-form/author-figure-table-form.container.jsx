import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../../redux/user/user.selectors';

import AuthorFigureTableForm from './author-figure-table-form.component';

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({

});

const AuthorFigureTableContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(AuthorFigureTableForm);

export default AuthorFigureTableContainer;
