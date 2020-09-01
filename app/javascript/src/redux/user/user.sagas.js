import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpFailure,
  signUpSuccess,
  editProfileSuccess,
  editProfileFailure
} from './user.actions';

import server from '../server';
import { swalMessage } from '../../components/shared/swal-message/swal-message';

function* signInWithEmail({ payload: { email, password } }) {
  try {
    const response = yield server.post('/users/sign_in', {
      user_login: {
        email,
        password
      }
    });

    if (response) {
      yield put(signInSuccess(response.data));
      yield swalMessage('Successfully logged in!', 'success');

      if (response.data.user_type === 3) {
        yield setTimeout(
          () => (window.location.href = '/submission/author/results'),
          2000
        );
      } else if (response.data.user_type === 1) {
        yield setTimeout(
          () => (window.location.href = '/submission/admin/results'),
          2000
        );
      } else if (response.data.user_type === 2) {
        yield setTimeout(
          () => (window.location.href = '/submission/se/results'),
          2000
        );
      }
    }
  } catch (error) {
    yield put(signInFailure(error.message));
    yield swalMessage(error, 'error');
  }
}

function* updateProfile({
  payload: { authToken, email, password, confirmPassword, currentPassword }
}) {
  try {
    const response = yield server.post('/api/users/update', {
      user: {
        authentication_token: authToken,
        email,
        password,
        password_confirmation: confirmPassword,
        currentPassword
      }
    });

    if (response) {
      yield put(editProfileSuccess({ user: response.data }));
      yield swalMessage('Successfully updated profile!', 'success');
      yield setTimeout(() => window.location.reload(), 2000);
    }
  } catch (error) {
    yield put(editProfileFailure(error.message));
    yield swalMessage(error.message, 'error');
  }
}

function* signUp({ payload: { email, password, confirmPassword } }) {
  try {
    const response = yield server.post('/users', {
      user: {
        email,
        password,
        password_confirmation: confirmPassword
      }
    });

    if (response) {
      yield put(signUpSuccess({ user: response.data }));
      yield swalMessage('Successfully signed up!', 'success');
      yield setTimeout(
        () => (window.location.href = '/submission/author/results'),
        2000
      );
    }
  } catch (error) {
    yield put(signUpFailure(error.message));
    yield swalMessage(error.message, 'error');
  }
}

function* signOut() {
  try {
    yield swalMessage('Successfully logged out!', 'success');
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error.message));
    yield swalMessage(error.message, 'error');
  }
}

function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

function* onEditProfileStart() {
  yield takeLatest(UserActionTypes.EDIT_PROFILE_START, updateProfile);
}

export function* userSaga() {
  yield all([
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onEditProfileStart)
  ]);
}
