import { takeLatest, put, all, call } from 'redux-saga/effects';

import CTROverviewActionTypes from './ctr-overview.types';

import {
  createCTROverviewSuccess,
  createCTROverviewFailure,
  retrieveOverviewCommentsSuccess,
  retrieveOverviewCommentsFailure
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
    id,
    resultCount
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
          result_count: 1,
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
          result_count: resultCount,
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

function* retrieveOverviewComments({ payload }) {
  try {
    const response = yield server.get(
      `/api/results/comments?result_id=${payload}&step=overview`
    );

    if (response) {
      yield put(retrieveOverviewCommentsSuccess(response.data.comments));
    }
  } catch (error) {
    yield put(retrieveOverviewCommentsFailure(error));
    yield swalMessage('Something went wrong!', 'error');
  }
}

function* onCreateCTROverviewStart() {
  yield takeLatest(
    CTROverviewActionTypes.CREATE_CTR_OVERVIEW_START,
    createCTROverview
  );
}

function* onRetrieveOverviewCommentsStart() {
  yield takeLatest(
    CTROverviewActionTypes.RETRIEVE_OVERVIEW_COMMENTS_START,
    retrieveOverviewComments
  );
}

export function* ctrOverviewSaga() {
  yield all([
    call(onCreateCTROverviewStart),
    call(onRetrieveOverviewCommentsStart)
  ]);
}
