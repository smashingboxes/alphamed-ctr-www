import { createSelector } from 'reselect';

const selectCTRAuthorSummary = (state) => state.ctrAuthorSummary;

export const selectCTRAuthorSummaryDetails = createSelector(
  [selectCTRAuthorSummary],
  (ctrAuthorSummary) => ctrAuthorSummary.ctrAuthorSummaryDetails
);
