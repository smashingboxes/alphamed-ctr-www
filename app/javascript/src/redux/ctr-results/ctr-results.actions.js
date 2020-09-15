import CTRResultsActionTypes from './ctr-results.types';

export const retrieveCTRResultsStart = (authToken) => ({
  type: CTRResultsActionTypes.RETRIEVE_CTR_RESULTS_START,
  payload: authToken
});

export const retrieveCTRResultsSuccess = (ctrResults) => ({
  type: CTRResultsActionTypes.RETRIEVE_CTR_RESULTS_SUCCESS,
  payload: ctrResults
});

export const retrieveCTRResultsFailure = (error) => ({
  type: CTRResultsActionTypes.RETRIEVE_CTR_RESULTS_FAILURE,
  payload: error
});
