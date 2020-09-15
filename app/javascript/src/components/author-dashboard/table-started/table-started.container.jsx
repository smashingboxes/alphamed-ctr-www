import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCTRResultsDetails } from '../../../redux/ctr-results/ctr-results.selectors';

import TableStarted from './table-started.component';

const mapStateToProps = createStructuredSelector({
  ctrResults: selectCTRResultsDetails
});

const TableStartedContainer = compose(connect(mapStateToProps))(TableStarted);

export default TableStartedContainer;
