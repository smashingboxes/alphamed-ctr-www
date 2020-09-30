import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCTRCommentsDetails } from '../../../redux/ctr-comments/ctr-comments.selectors';

import CTRCommentsTable from './ctr-comments-table.component';

const mapStateToProps = createStructuredSelector({
  comments: selectCTRCommentsDetails
});

const CTRCommentsTableContainer = compose(connect(mapStateToProps))(
  CTRCommentsTable
);

export default CTRCommentsTableContainer;
