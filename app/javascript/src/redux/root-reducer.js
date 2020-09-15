import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import ctrOverviewReducer from './ctr-overview/ctr-overview.reducer';
import ctrYourInformationReducer from './ctr-your-information/ctr-your-information.reducer';
import ctrCoAuthorReducer from './ctr-co-author/ctr-co-author.reducer';
import ctrAuthorSummaryReducer from './ctr-author-summary/ctr-author-summary.reducer';
import ctrTrailInformationReducer from './ctr-trail-information/ctr-trail-information.reducer';
import ctrDrugInformationReducer from './ctr-drug-information/ctr-drug-information.reducer';
import ctrResultsReducer from './ctr-results/ctr-results.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'ctrResults']
};

const rootReducer = combineReducers({
  user: userReducer,
  ctrOverview: ctrOverviewReducer,
  ctrYourInformation: ctrYourInformationReducer,
  ctrCoAuthor: ctrCoAuthorReducer,
  ctrAuthorSummary: ctrAuthorSummaryReducer,
  ctrTrailInformation: ctrTrailInformationReducer,
  ctrDrugInformation: ctrDrugInformationReducer,
  ctrResults: ctrResultsReducer
});

export default persistReducer(persistConfig, rootReducer);
