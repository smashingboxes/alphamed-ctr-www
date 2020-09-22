import { takeLatest, put, all, call } from 'redux-saga/effects';

import CTRCoAuthorActionTypes from './ctr-co-author.types';

import {
  createCTRCoAuthorSuccess,
  createCTRCoAuthorFailure
} from './ctr-co-author.actions';

import server from '../server';
import { swalMessage } from '../../components/shared/swal-message/swal-message';

function* createCTRCoAuthor({
  payload: { authToken, coAuthors, users, id, type }
}) {
  try {
    const response = yield server.patch(`/api/results?result_id=${id}`, {
      section: 'coauthor_information',
      authentication_token: authToken,
      result: {
        coauthors: coAuthors,
        users
      }
    });

    if (response) {
      yield put(createCTRCoAuthorSuccess());

      if (type === 'delete') {
        yield swalMessage(
          'Successfully deleted a CTR co-authors details!',
          'success'
        );
        yield setTimeout(() => window.location.reload(), 2000);
      } else if (type === 'add') {
        yield swalMessage(
          'Successfully stored new CTR co-authors details!',
          'success'
        );
        yield setTimeout(() => window.location.reload(), 2000);
      } else {
        yield swalMessage(
          'Successfully stored new CTR co-authors details!',
          'success'
        );
        yield setTimeout(
          () =>
            (window.location.href = `/submission/results/author-summary-abstract/${response.data._id.$oid}`),
          2000
        );
      }
    }
  } catch (error) {
    yield put(createCTRCoAuthorFailure(error.message));
    yield swalMessage('Something went wrong!', 'error');
  }
}

function* onCreateCTRCoAuthorStart() {
  yield takeLatest(
    CTRCoAuthorActionTypes.CREATE_CTR_CO_AUTHOR_START,
    createCTRCoAuthor
  );
}

export function* ctrCoAuthorSaga() {
  yield all([call(onCreateCTRCoAuthorStart)]);
}
