import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import ctrOverviewReducer from './ctr-overview/ctr-overview.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  user: userReducer,
  ctrOverview: ctrOverviewReducer
});

export default persistReducer(persistConfig, rootReducer);
