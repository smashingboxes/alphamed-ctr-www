import { takeLatest, put, all, call } from 'redux-saga/effects';

import CTRTrailInformationActionTypes from './ctr-trail-information.types';

import {
  createCTRTrailInformationSuccess,
  createCTRTrailInformationFailure
} from './ctr-trail-information.actions';

import server from '../server';
import { swalMessage } from '../../components/shared/swal-message/swal-message';

function* createTrailInformation({
  payload: {
    authToken,
    diseases,
    stageOfDisease,
    priorTherapy,
    typeOfStudy2,
    primaryEndpoints,
    secondaryEndpoints,
    endpointsDetails,
    investigatorsAssessment,
    id
  }
}) {
  try {
    const response = yield server.patch(`/api/results?result_id=${id}`, {
      section: 'trail_information',
      authentication_token: authToken,
      result: {
        diseases,
        stage_of_disease_or_treatment: stageOfDisease,
        prior_therapy: priorTherapy,
        type_of_study_2: typeOfStudy2,
        primary_endpoints: primaryEndpoints,
        secondary_endpoints: secondaryEndpoints,
        endpoints_details: endpointsDetails,
        investigators_assessment: investigatorsAssessment
      }
    });

    if (response) {
      yield put(createCTRTrailInformationSuccess());
      yield swalMessage(
        'Successfully stored CTR Trail Information!',
        'success'
      );
    }
  } catch (error) {
    yield put(createCTRTrailInformationFailure(error.message));
    yield swalMessage(error.message, 'error');
  }
}

function* onCreateTrailInformationStart() {
  yield takeLatest(
    CTRTrailInformationActionTypes.CREATE_CTR_TRAIL_INFORMATION_START,
    createTrailInformation
  );
}

export function* ctrTrailInformationSaga() {
  yield all([call(onCreateTrailInformationStart)]);
}
