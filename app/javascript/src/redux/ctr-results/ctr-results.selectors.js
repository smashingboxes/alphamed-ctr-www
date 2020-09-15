import { createSelector } from 'reselect';

const selectCTRResults = (state) => state.ctrResults;

export const selectCTRResultsDetails = createSelector(
  [selectCTRResults],
  (ctrResults) => ctrResults.ctrResults
);

export const selectCTRResult = (id) => {
  return createSelector([selectCTRResults], (ctrResults) =>
    ctrResults.ctrResults
      ? ctrResults.ctrResults.filter((results) => results._id.$oid === id)
      : null
  );
};
