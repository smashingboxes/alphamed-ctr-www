import CTRDrugInformationActionTypes from './ctr-drug-information.types';

const INITIAL_STATE = {
  ctrDrugInformationDetails: null,
  error: null
};

const ctrDrugInformationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CTRDrugInformationActionTypes.RETRIEVE_CTR_DRUG_INFORMATION_SUCCESS:
      return {
        ...state,
        ctrDrugInformationDetails: action.payload,
        error: null
      };
    case CTRDrugInformationActionTypes.RETRIEVE_CTR_DRUG_INFORMATION_FAILURE:
      return {
        ...state,
        ctrDrugInformationDetails: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default ctrDrugInformationReducer;
