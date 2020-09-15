import { createSelector } from 'reselect';

const selectCTRCoAuthor = (state) => state.ctrCoAuthor;

export const selectCTRCoAuthorDetails = createSelector(
  [selectCTRCoAuthor],
  (ctrCoAuthor) => ctrCoAuthor.ctrCoAuthorDetails
);
