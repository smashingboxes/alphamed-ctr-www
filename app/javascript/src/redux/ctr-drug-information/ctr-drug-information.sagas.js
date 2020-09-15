import { takeLatest, put, all, call } from 'redux-saga/effects';

import CTRDrugInformationActionTypes from './ctr-drug-information.types';

import {
  createCTRDrugInformationSuccess,
  createCTRDrugInformationFailure
} from './ctr-drug-information.actions';

import server from '../server';
import { swalMessage } from '../../components/shared/swal-message/swal-message';

function* createDrugInformation({ payload: { authToken, arms } }) {
  try {
    const response = yield server.post('/api/results', {
      section: 'drug_information',
      authentication_token: authToken,
      result: {
        arms
      }
    });

    if (response) {
      yield put(createCTRDrugInformationSuccess());
      yield swalMessage(
        'Successfully created your CTR Drug Information!',
        'success'
      );
    }
  } catch (error) {
    yield put(createCTRDrugInformationFailure(error.message));
    yield swalMessage(error.message, 'error');
  }
}

function* onCreateDrugInformationStart() {
  yield takeLatest(
    CTRDrugInformationActionTypes.CREATE_CTR_DRUG_INFORMATION_START,
    createDrugInformation
  );
}

export function* ctrDrugInformationSaga() {
  yield all([call(onCreateDrugInformationStart)]);
}
