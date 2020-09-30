import { takeLatest, put, all, call } from 'redux-saga/effects';

import CTRPatientCharacteristicsActionTypes from './ctr-patient-characteristics.types';

import {
  createCTRPatientCharacteristicsSuccess,
  createCTRPatientCharacteristicsFailure
} from './ctr-patient-characteristics.actions';

import server from '../server';
import { swalMessage } from '../../components/shared/swal-message/swal-message';

function* createPatientCharacteristics({
  payload: { authToken, arms, id, resultCount }
}) {
  try {
    const response = yield server.patch(`/api/results`, {
      section: 'patient_characteristics',
      authentication_token: authToken,
      result_id: id,
      result: {
        arms,
        result_count: resultCount
      }
    });

    if (response) {
      yield put(createCTRPatientCharacteristicsSuccess());
      yield swalMessage(
        'Successfully created your CTR Patient Characteristics!',
        'success'
      );
      yield setTimeout(
        () =>
          (window.location.href = `/submission/results/primary-assessment-method/${response.data._id.$oid}`),
        2000
      );
    }
  } catch (error) {
    yield put(createCTRPatientCharacteristicsFailure(error.message));
    yield swalMessage('Something went wrong!', 'error');
  }
}

function* onCreatePatientCharacteristicsStart() {
  yield takeLatest(
    CTRPatientCharacteristicsActionTypes.CREATE_CTR_PATIENT_CHARACTERISTICS_START,
    createPatientCharacteristics
  );
}

export function* ctrPatientCharacteristicsSaga() {
  yield all([call(onCreatePatientCharacteristicsStart)]);
}
