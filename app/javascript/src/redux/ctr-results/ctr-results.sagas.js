import { takeLatest, put, all, call } from 'redux-saga/effects';

import CTRResultsActionTypes from './ctr-results.types';

import {
  retrieveCTRResultsSuccess,
  retrieveCTRResultsFailure,
  deleteCTRResultsSuccess
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
    yield swalMessage('Something went wrong!', 'error');
  }
}

function* deleteCTRResults({ payload: { resultId } }) {
  try {
    yield server.delete(`/results/${resultId}`);
  } catch (error) {
    yield put(deleteCTRResultsSuccess());
    yield swalMessage('Successfully deleted CTR details!', 'success');
    yield setTimeout(() => window.location.reload(), 2000);
  }
}

function* onRetrieveCTRResultsStart() {
  yield takeLatest(
    CTRResultsActionTypes.RETRIEVE_CTR_RESULTS_START,
    retrieveCTRResults
  );
}

function* onDeleteCTRResultsStart() {
  yield takeLatest(
    CTRResultsActionTypes.DELETE_CTR_RESULTS_START,
    deleteCTRResults
  );
}

export function* ctrResultsSaga() {
  yield all([call(onRetrieveCTRResultsStart), call(onDeleteCTRResultsStart)]);
}
