import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCTRResult } from '../../redux/ctr-results/ctr-results.selectors';

import TrailInformationPage from './trial-information.page';

const mapStateToProps = createStructuredSelector({
  ctrResult: (state, ownProps) =>
    selectCTRResult(ownProps.match.params.id)(state)
});

const TrailInformationPageContainer = compose(connect(mapStateToProps))(
  TrailInformationPage
);

export default TrailInformationPageContainer;
