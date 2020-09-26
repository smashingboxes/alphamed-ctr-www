import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCTRResult } from '../../redux/ctr-results/ctr-results.selectors';

import AuthorPatientCharPage from './author-patient-char.page';

const mapStateToProps = createStructuredSelector({
  ctrResult: (state, ownProps) =>
    selectCTRResult(ownProps.match.params.id)(state)
});

const AuthorPatientCharPageContainer = compose(connect(mapStateToProps))(
  AuthorPatientCharPage
);

export default AuthorPatientCharPageContainer;
