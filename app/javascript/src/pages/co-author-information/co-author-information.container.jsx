import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCTRResult } from '../../redux/ctr-results/ctr-results.selectors';

import CoAuthorInformationPage from './co-author-information.page';

const mapStateToProps = createStructuredSelector({
  ctrResult: (state, ownProps) =>
    selectCTRResult(ownProps.match.params.id)(state)
});

const CoAuthorInformationPageContainer = compose(connect(mapStateToProps))(
  CoAuthorInformationPage
);

export default CoAuthorInformationPageContainer;
