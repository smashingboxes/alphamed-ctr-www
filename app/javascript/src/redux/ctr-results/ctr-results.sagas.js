import { takeLatest, put, all, call } from 'redux-saga/effects';

import CTRResultsActionTypes from './ctr-results.types';

import {
  retrieveCTRResultsSuccess,
  retrieveCTRResultsFailure
} from './ctr-results.actions';

import server from '../server';
import { swalMessage } from '../../components/shared/swal-message/swal-message';

function* retrieveCTRResults({ payload: { authToken } }) {
  try {
    const response = yield server.get(`/results.json?auth_token=${authToken}`);

    if (response) {
      yield put(retrieveCTRResultsSuccess(response.data));
    }
  } catch (error) {
    yield put(retrieveCTRResultsFailure(error));
    yield swalMessage(error, 'error');
  }
}

function* onRetrieveCTRResultsStart() {
  yield takeLatest(
    CTRResultsActionTypes.RETRIEVE_CTR_RESULTS_START,
    retrieveCTRResults
  );
}

export function* ctrResultsSaga() {
  yield all([call(onRetrieveCTRResultsStart)]);
}
