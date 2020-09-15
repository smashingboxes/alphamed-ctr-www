import CTRTrailInformationActionTypes from './ctr-trail-information.types';

const INITIAL_STATE = {
  ctrTrailInformationDetails: null,
  error: null
};

const ctrTrailInformationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CTRTrailInformationActionTypes.RETRIEVE_CTR_TRAIL_INFORMATION_SUCCESS:
      return {
        ...state,
        ctrTrailInformationDetails: action.payload,
        error: null
      };
    case CTRTrailInformationActionTypes.RETRIEVE_CTR_TRAIL_INFORMATION_FAILURE:
      return {
        ...state,
        ctrTrailInformationDetails: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default ctrTrailInformationReducer;
