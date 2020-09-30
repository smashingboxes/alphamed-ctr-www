import { takeLatest, put, all, call } from 'redux-saga/effects';

import CTRCommentActionTypes from './ctr-comments.types';

import {
  createCTRCommentSuccess,
  createCTRCommentFailure,
  retrieveCTRCommentSuccess,
  retrieveCTRCommentFailure
} from './ctr-comments.actions';

import server from '../server';
import { swalMessage } from '../../components/shared/swal-message/swal-message';

function* createCTRComment({
  payload: { authToken, comment, resultId, step }
}) {
  try {
    const response = yield server.post(`/comments`, {
      result_id: resultId,
      auth_token: authToken,
      comment: {
        content: comment,
        step
      }
    });

    if (response) {
      yield put(createCTRCommentSuccess(response.data.comment));
      yield swalMessage('Successfully added your comment!', 'success');
    }
  } catch (error) {
    yield put(createCTRCommentFailure(error.message));
    yield swalMessage('Something went wrong!', 'error');
  }
}

function* retrieveCTRComments({ payload: { step, resultId } }) {
  try {
    const response = yield server.get(
      `api/results/comments?result_id=${resultId}&step=${step}`
    );

    if (response) {
      yield put(retrieveCTRCommentSuccess(response.data.comments));
    }
  } catch (error) {
    yield put(retrieveCTRCommentFailure(error.message));
    yield swalMessage('Something went wrong!', 'error');
  }
}

function* onCreateCTRCommentStart() {
  yield takeLatest(
    CTRCommentActionTypes.CREATE_COMMENT_START,
    createCTRComment
  );
}

function* onRetrieveCTRCommentsStart() {
  yield takeLatest(
    CTRCommentActionTypes.RETRIEVE_COMMENTS_START,
    retrieveCTRComments
  );
}

export function* ctrCommentsSaga() {
  yield all([call(onCreateCTRCommentStart), call(onRetrieveCTRCommentsStart)]);
}
