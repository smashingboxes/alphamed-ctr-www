import CTRYourInformationTypes from './ctr-your-information.types';

const INITIAL_STATE = {
  ctrYourInformation: null,
  error: null
};

const ctrYourInformationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CTRYourInformationTypes.RETRIEVE_CTR_YOUR_INFORMATION_SUCCESS:
      return {
        ...state,
        ctrYourInformation: action.payload,
        error: null
      };
    case CTRYourInformationTypes.RETRIEVE_CTR_YOUR_INFORMATION_FAILURE:
      return {
        ...state,
        ctrYourInformation: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default ctrYourInformationReducer;
