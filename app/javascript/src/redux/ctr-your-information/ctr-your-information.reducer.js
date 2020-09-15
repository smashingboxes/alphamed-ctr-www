import CTRYourInformationTypes from './ctr-your-information.types';

const INITIAL_STATE = {
  ctrYourInformationDetails: null,
  error: null
};

const ctrYourInformationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CTRYourInformationTypes.RETRIEVE_CTR_YOUR_INFORMATION_SUCCESS:
      return {
        ...state,
        ctrYourInformationDetails: action.payload,
        error: null
      };
    case CTRYourInformationTypes.RETRIEVE_CTR_YOUR_INFORMATION_FAILURE:
      return {
        ...state,
        ctrYourInformationDetails: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default ctrYourInformationReducer;
