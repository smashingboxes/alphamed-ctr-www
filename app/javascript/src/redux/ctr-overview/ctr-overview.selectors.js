import { createSelector } from 'reselect';

const selectCTROverview = (state) => state.ctrOverview;

export const selectCTROverviewDetails = createSelector(
  [selectCTROverview],
  (ctrOverview) => ctrOverview.ctrOverviewDetails
);
