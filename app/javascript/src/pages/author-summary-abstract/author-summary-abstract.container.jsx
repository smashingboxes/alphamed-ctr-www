import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCTRResult } from '../../redux/ctr-results/ctr-results.selectors';

import AuthorSummaryAbstractPage from './author-summary-abstract.page';

const mapStateToProps = createStructuredSelector({
  ctrResult: (state, ownProps) =>
    selectCTRResult(ownProps.match.params.id)(state)
});

const AuthorSummaryAbstractPageContainer = compose(connect(mapStateToProps))(
  AuthorSummaryAbstractPage
);

export default AuthorSummaryAbstractPageContainer;
