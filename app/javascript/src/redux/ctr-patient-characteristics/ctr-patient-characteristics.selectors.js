import { createSelector } from 'reselect';

const selectCTRPatientCharacteristics = (state) =>
  state.ctrPatientCharacteristics;

export const selectCTRPatientCharacteristicsDetails = createSelector(
  [selectCTRPatientCharacteristics],
  (ctrPatientCharacteristics) =>
    ctrPatientCharacteristics.ctrPatientCharacteristicsDetails
);
