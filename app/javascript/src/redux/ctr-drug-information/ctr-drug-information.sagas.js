import { takeLatest, put, all, call } from 'redux-saga/effects';

import CTRDrugInformationActionTypes from './ctr-drug-information.types';

import {
  createCTRDrugInformationSuccess,
  createCTRDrugInformationFailure
} from './ctr-drug-information.actions';

import server from '../server';
import { swalMessage } from '../../components/shared/swal-message/swal-message';

function* createDrugInformation({
  payload: { authToken, arms, id, resultCount }
}) {
  try {
    const response = yield server.patch(`/api/results`, {
      section: 'drug_information',
      authentication_token: authToken,
      result_id: id,
      result: {
        arms,
        result_count: resultCount
      }
    });

    if (response) {
      yield put(createCTRDrugInformationSuccess());
      yield swalMessage(
        'Successfully created your CTR Drug Information!',
        'success'
      );
      yield setTimeout(
        () =>
          (window.location.href = `/submission/results/patient-characteristics/${response.data._id.$oid}`),
        2000
      );
    }
  } catch (error) {
    yield put(createCTRDrugInformationFailure(error.message));
    yield swalMessage('Something went wrong!', 'error');
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
