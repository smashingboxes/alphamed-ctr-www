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
    keywords,
    isEdit,
    id
  }
}) {
  try {
    let data = {};
    let response;

    if (!isEdit) {
      data = {
        section: 'overview',
        authentication_token: authToken,
        result: {
          title,
          running_head: runningHead,
          identifier,
          sponsor,
          irb_approved: checked,
          study_phase: typeOfStudy,
          key_words: keywords
        }
      };

      response = yield server.patch('/api/results', data);

      if (response) {
        yield put(createCTROverviewSuccess());
        yield swalMessage('Successfully added your CTR overview!', 'success');
        yield setTimeout(
          () =>
            (window.location.href = `/submission/results/your-information/${response.data._id.$oid}`),
          2000
        );
      }
    } else {
      data = {
        section: 'overview',
        authentication_token: authToken,
        result: {
          title,
          running_head: runningHead,
          identifier,
          sponsor,
          irb_approved: checked,
          study_phase: typeOfStudy,
          key_words: keywords
        }
      };

      response = yield server.patch(`/api/results?result_id=${id}`, data);

      if (response) {
        yield put(createCTROverviewSuccess());
        yield swalMessage('Successfully updated your CTR overview!', 'success');
        yield setTimeout(
          () =>
            (window.location.href = `/submission/results/your-information/${response.data._id.$oid}`),
          2000
        );
      }
    }
  } catch (error) {
    yield put(createCTROverviewFailure(error.message));
    yield swalMessage('Something went wrong!', 'error');
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
