import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isAuthenticated: false
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
    case UserActionTypes.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        isAuthenticated: true
      };
    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload.user,
        error: null,
        isAuthenticated: true
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
        isAuthenticated: false
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.EDIT_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default userReducer;
