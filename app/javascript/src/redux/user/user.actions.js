import UserActionTypes from './user.types';

export const emailSignInStart = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: error
});

export const signUpStart = (userCredentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials
});

export const signUpSuccess = ({ user }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user }
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error
});

export const editProfileStart = (userCredentials) => ({
  type: UserActionTypes.EDIT_PROFILE_START,
  payload: userCredentials
});

export const editProfileSuccess = ({ user }) => ({
  type: UserActionTypes.EDIT_PROFILE_SUCCESS,
  payload: user
});

export const editProfileFailure = (error) => ({
  type: UserActionTypes.EDIT_PROFILE_FAILURE,
  payload: error
});
