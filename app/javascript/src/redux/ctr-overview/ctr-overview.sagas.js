import { takeLatest, put, all, call } from 'redux-saga/effects';

import CTROverviewActionTypes from './ctr-overview.types';

import {
  createCTROverviewSuccess,
  createCTROverviewFailure
} from './ctr-overview.actions';

import server from '../server';
import { swalMessage } from '../../components/shared/swal-message/swal-message';

function* createCTROverview({
  payload: {
    authToken,
    title,
    runningHead,
    identifier,
    sponsor,
    checked,
    typeOfStudy,
    keywords
  }
}) {
  try {
    const response = yield server.post('/api/results', {
      section: 'overview',
      authentication_token: authToken,
      result: {
        title,
        running_head: runningHead,
        identifier,
        sponsor,
        irb_approved: checked,
        study_phase: typeOfStudy,
        keywords
      }
    });

    if (response) {
      yield put(createCTROverviewSuccess());
      yield swalMessage('Successfully created your CTR overview!', 'success');
    }
  } catch (error) {
    yield put(createCTROverviewFailure(error.message));
    yield swalMessage(error.message, 'error');
  }
}

function* onCreateCTROverviewStart() {
  yield takeLatest(
    CTROverviewActionTypes.CREATE_CTR_OVERVIEW_START,
    createCTROverview
  );
}

export function* ctrOverviewSaga() {
  yield all([call(onCreateCTROverviewStart)]);
}
