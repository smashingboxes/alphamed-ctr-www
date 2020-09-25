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
    additionalDetails,
    investigatorsAssessment,
    id
  }
}) {
  try {
    const response = yield server.patch(`/api/results?result_id=${id}`, {
      section: 'trial_information',
      authentication_token: authToken,
      result: {
        diseases,
        stage_of_disease_or_treatment: stageOfDisease,
        prior_therapy: priorTherapy,
        type_of_study_2: typeOfStudy2,
        primary_endpoints: primaryEndpoints,
        secondary_endpoints: secondaryEndpoints,
        endpoints_details: additionalDetails,
        investigators_assessment: investigatorsAssessment
      }
    });

    if (response) {
      console.log(response);
      yield put(createCTRTrailInformationSuccess());
      yield swalMessage(
        'Successfully stored CTR Trail Information!',
        'success'
      );
      yield setTimeout(
        () =>
          (window.location.href = `/submission/results/drug-information/${response.data._id.$oid}`),
        2000
      );
    }
  } catch (error) {
    yield put(createCTRTrailInformationFailure(error.message));
    yield swalMessage('Something went wrong!', 'error');
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
