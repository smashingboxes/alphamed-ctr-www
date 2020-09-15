import { createSelector } from 'reselect';

const selectCTRTrailInformation = (state) => state.ctrTrailInformation;

export const selectCTRTrailInformationDetails = createSelector(
  [selectCTRTrailInformation],
  (ctrTrailInformation) => ctrTrailInformation.ctrTrailInformationDetails
);
