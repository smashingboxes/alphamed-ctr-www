import CTRPatientCharacteristicsActionTypes from './ctr-patient-characteristics.types';

const INITIAL_STATE = {
  ctrPatientCharacteristicsDetails: null,
  error: null
};

const ctrPatientCharacteristicsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CTRPatientCharacteristicsActionTypes.RETRIEVE_CTR_PATIENT_CHARACTERISTICS_SUCCESS:
      return {
        ...state,
        ctrPatientCharacteristics: action.payload,
        error: null
      };
    case CTRPatientCharacteristicsActionTypes.RETRIEVE_CTR_PATIENT_CHARACTERISTICS_FAILURE:
      return {
        ...state,
        ctrPatientCharacteristics: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default ctrPatientCharacteristicsReducer;
