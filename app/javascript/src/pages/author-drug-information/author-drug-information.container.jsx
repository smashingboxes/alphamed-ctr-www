import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCTRResult } from '../../redux/ctr-results/ctr-results.selectors';

import AuthorDrugInformationPage from './author-drug-information.page';

const mapStateToProps = createStructuredSelector({
  ctrResult: (state, ownProps) =>
    selectCTRResult(ownProps.match.params.id)(state)
});

const AuthorDrugInformationPageContainer = compose(connect(mapStateToProps))(
  AuthorDrugInformationPage
);

export default AuthorDrugInformationPageContainer;
