import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectIsAuthenticated = createSelector(
  [selectUser],
  (user) => user.isAuthenticated
);

export const selectAuthToken = createSelector(
  [selectUser],
  (user) => user.currentUser.authentication_token
);
