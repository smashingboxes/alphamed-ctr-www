import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure
} from './user.actions';

import server from '../server';

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const response = yield server.post('/users/sign_in', {
      user_login: {
        email,
        password
      }
    });

    if (response) {
      signInSuccess(response);
    }
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* signOut() {
  try {
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error.message));
  }
}

function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* userSaga() {
  yield all([call(onEmailSignInStart), call(onSignOutStart)]);
}
