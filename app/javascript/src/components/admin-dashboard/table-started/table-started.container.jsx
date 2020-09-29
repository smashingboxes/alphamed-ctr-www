import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCTRResultsDetails } from '../../../redux/ctr-results/ctr-results.selectors';
import { deleteCTRResultsStart } from '../../../redux/ctr-results/ctr-results.actions';

import TableStarted from './table-started.component';

const mapStateToProps = createStructuredSelector({
  ctrResults: selectCTRResultsDetails
});

const mapDispatchToProps = (dispatch) => ({
  deleteCTRResultsStart: (resultId) =>
    dispatch(deleteCTRResultsStart({ resultId }))
});

const TableStartedContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(TableStarted);

export default TableStartedContainer;
