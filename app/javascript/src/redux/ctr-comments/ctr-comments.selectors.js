import { createSelector } from 'reselect';

const selectCTRComments = (state) => state.ctrComments;

export const selectCTRCommentsDetails = createSelector(
  [selectCTRComments],
  (ctrComments) => ctrComments.ctrComments
);
