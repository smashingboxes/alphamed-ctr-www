import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCTRResult } from '../../redux/ctr-results/ctr-results.selectors';

import AuthorAdverseEventPage from './author-adverse-event.page';

const mapStateToProps = createStructuredSelector({
  ctrResult: (state, ownProps) =>
    selectCTRResult(ownProps.match.params.id)(state)
});

const AuthorAdverseEventPageContainer = compose(connect(mapStateToProps))(
  AuthorAdverseEventPage
);

export default AuthorAdverseEventPageContainer;
