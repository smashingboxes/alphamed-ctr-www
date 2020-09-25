import { takeLatest, put, all, call } from 'redux-saga/effects';

import CTRYourInformationTypes from './ctr-your-information.types';

import {
  createCTRYourInformationSuccess,
  createCTRYourInformationFailure,
  retrieveCTRYourInformationFailure,
  retrieveCTRYourInformationSuccess
} from './ctr-your-information.actions';

import server from '../server';
import { swalMessage } from '../../components/shared/swal-message/swal-message';

function* createCTRYourInformation({
  payload: {
    authToken,
    firstName,
    middleName,
    lastName,
    fullName,
    firstDegree,
    secondDegree,
    addressOne,
    addressTwo,
    city,
    stateProvince,
    zipCode,
    country,
    telephone,
    institutions,
    principalInvestigator,
    correspondingAuthor,
    submitterOnly,
    assisted,
    acknowledgements,
    id
  }
}) {
  try {
    const response = yield server.patch(`/api/results?result_id=${id}`, {
      section: 'your_information',
      authentication_token: authToken,
      result: {
        author_first_name: firstName,
        author_middle_name: middleName,
        author_last_name: lastName,
        author_degrees: {
          first: firstDegree,
          second: secondDegree
        },
        author_name: fullName,
        author_institutions: institutions,
        author_address_1: addressOne,
        author_address_2: addressTwo,
        author_city: city,
        author_statoid: stateProvince,
        author_zip: zipCode,
        author_country: country,
        author_phone: telephone,
        author_pi: principalInvestigator,
        author_ca: correspondingAuthor,
        author_assisted: assisted,
        author_submitter: submitterOnly,
        author_acknowledgements: acknowledgements
      }
    });

    if (response) {
      yield put(createCTRYourInformationSuccess());
      yield swalMessage(
        'Successfully stored your CTR personal information!',
        'success'
      );
      yield setTimeout(
        () =>
          (window.location.href = `/submission/results/co-author-information/${response.data._id.$oid}`),
        2000
      );
    }
  } catch (error) {
    yield put(createCTRYourInformationFailure(error.message));
    yield swalMessage('Something went wrong!', 'error');
  }
}

function* retrieveYourInformationData({ payload: { authToken } }) {
  try {
    const response = yield server.get(
      `/api/results/your_information?auth_token=${authToken}`
    );

    if (response) {
      yield put(retrieveCTRYourInformationSuccess(response.data));
    }
  } catch (error) {
    yield put(retrieveCTRYourInformationFailure(error));
    yield swalMessage('Something went wrong!', 'error');
  }
}

function* onRetrieveYourInformationStart() {
  yield takeLatest(
    CTRYourInformationTypes.RETRIEVE_CTR_YOUR_INFORMATION_START,
    retrieveYourInformationData
  );
}

function* onCreateYourInformationStart() {
  yield takeLatest(
    CTRYourInformationTypes.CREATE_CTR_YOUR_INFORMATION_START,
    createCTRYourInformation
  );
}

export function* ctrYourInformationSaga() {
  yield all([
    call(onCreateYourInformationStart),
    call(onRetrieveYourInformationStart)
  ]);
}
