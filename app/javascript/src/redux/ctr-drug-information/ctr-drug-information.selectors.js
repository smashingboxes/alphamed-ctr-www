import { createSelector } from 'reselect';

const selectCTRDrugInformation = (state) => state.ctrDrugInformation;

export const selectCTRDrugInformationDetails = createSelector(
  [selectCTRDrugInformation],
  (ctrDrugInformation) => ctrDrugInformation.ctrDrugInformationDetails
);
