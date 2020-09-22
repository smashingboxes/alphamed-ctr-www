import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCTRResult } from '../../redux/ctr-results/ctr-results.selectors';

import AuthorFigureTablePage from './author-figure-table.page';

const mapStateToProps = createStructuredSelector({
  ctrResult: (state, ownProps) =>
    selectCTRResult(ownProps.match.params.id)(state)
});

const AuthorFigureTablePageContainer = compose(connect(mapStateToProps))(
  AuthorFigureTablePage
);

export default AuthorFigureTablePageContainer;
