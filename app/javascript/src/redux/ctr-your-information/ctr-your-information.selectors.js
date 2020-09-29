import { createSelector } from 'reselect';

const selectCTRYourInformation = (state) => state.ctrYourInformation;

export const selectCTRYourInformationDetails = createSelector(
  [selectCTRYourInformation],
  (ctrYourInformation) => ctrYourInformation.ctrYourInformationDetails
);
