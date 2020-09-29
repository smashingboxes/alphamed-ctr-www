import CTRPatientCharacteristicsActionTypes from './ctr-patient-characteristics.types';

export const createCTRPatientCharacteristicsStart = (details) => ({
  type:
    CTRPatientCharacteristicsActionTypes.CREATE_CTR_PATIENT_CHARACTERISTICS_START,
  payload: details
});

export const createCTRPatientCharacteristicsSuccess = () => ({
  type:
    CTRPatientCharacteristicsActionTypes.CREATE_CTR_PATIENT_CHARACTERISTICS_SUCCESS
});

export const createCTRPatientCharacteristicsFailure = (error) => ({
  type:
    CTRPatientCharacteristicsActionTypes.CREATE_CTR_PATIENT_CHARACTERISTICS_FAILURE,
  payload: error
});
