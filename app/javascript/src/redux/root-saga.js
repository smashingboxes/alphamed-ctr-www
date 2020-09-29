import { all, call } from 'redux-saga/effects';

import { userSaga } from './user/user.sagas';
import { ctrOverviewSaga } from './ctr-overview/ctr-overview.sagas';
import { ctrYourInformationSaga } from './ctr-your-information/ctr-your-information.sagas';
import { ctrCoAuthorSaga } from './ctr-co-author/ctr-co-author.sagas';
import { ctrAuthorSummarySaga } from './ctr-author-summary/ctr-author-summary.sagas';
import { ctrTrailInformationSaga } from './ctr-trail-information/ctr-trail-information.sagas';
import { ctrDrugInformationSaga } from './ctr-drug-information/ctr-drug-information.sagas';
import { ctrResultsSaga } from './ctr-results/ctr-results.sagas';
import { ctrCommentsSaga } from './ctr-comments/ctr-comments.sagas';
import { ctrPatientCharacteristicsSaga } from './ctr-patient-characteristics/ctr-patient-characteristics.sagas';

export default function* rootSaga() {
  yield all([
    call(userSaga),
    call(ctrOverviewSaga),
    call(ctrYourInformationSaga),
    call(ctrCoAuthorSaga),
    call(ctrAuthorSummarySaga),
    call(ctrTrailInformationSaga),
    call(ctrDrugInformationSaga),
    call(ctrResultsSaga),
    call(ctrCommentsSaga),
    call(ctrPatientCharacteristicsSaga)
  ]);
}
