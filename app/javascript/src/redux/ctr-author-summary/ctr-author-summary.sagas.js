import { takeLatest, put, all, call } from 'redux-saga/effects';

import CTRAuthorSummaryActionTypes from './ctr-author-summary.types';

import {
  createCTRAuthorSummarySuccess,
  createCTRAuthorSummaryFailure
} from './ctr-author-summary.actions';

import server from '../server';
import { swalMessage } from '../../components/shared/swal-message/swal-message';

function* createCTRAuthorSummary({
  payload: {
    authToken,
    background,
    methods,
    results,
    conclusions,
    discussion,
    lessonsLearned,
    id
  }
}) {
  try {
    const response = yield server.patch(`/api/results?result_id=${id}`, {
      section: 'author_summary',
      authentication_token: authToken,
      result: {
        abstract_background: background,
        abstract_methods: methods,
        abstract_results: results,
        abstract_conclusions: conclusions,
        abstract_discussion: discussion,
        abstract_lessons_learned: lessonsLearned
      }
    });

    if (response) {
      yield put(createCTRAuthorSummarySuccess());
      yield swalMessage(
        'Successfully stored CTR author summary/abstract!',
        'success'
      );
    }
  } catch (error) {
    yield put(createCTRAuthorSummaryFailure(error.message));
    yield swalMessage('Something went wrong!', 'error');
  }
}

function* onCreateCTRAuthorSummaryStart() {
  yield takeLatest(
    CTRAuthorSummaryActionTypes.CREATE_CTR_AUTHOR_SUMMARY_START,
    createCTRAuthorSummary
  );
}

export function* ctrAuthorSummarySaga() {
  yield all([call(onCreateCTRAuthorSummaryStart)]);
}
