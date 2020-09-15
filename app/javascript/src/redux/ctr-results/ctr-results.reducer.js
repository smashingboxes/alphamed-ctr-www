import CTRResultsActionTypes from './ctr-results.types';

const INITIAL_STATE = {
  ctrResults: null,
  error: null
};

const ctrResultsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CTRResultsActionTypes.RETRIEVE_CTR_RESULTS_SUCCESS:
      return {
        ...state,
        ctrResults: action.payload,
        error: null
      };
    case CTRResultsActionTypes.RETRIEVE_CTR_RESULTS_FAILURE:
      return {
        ...state,
        ctrResults: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default ctrResultsReducer;
