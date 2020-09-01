import { all, call } from 'redux-saga/effects';

import { userSaga } from './user/user.sagas';
import { ctrOverviewSaga } from './ctr-overview/ctr-overview.sagas';

export default function* rootSaga() {
  yield all([call(userSaga), call(ctrOverviewSaga)]);
}
