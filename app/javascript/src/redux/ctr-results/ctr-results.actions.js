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

export const deleteCTRResultsStart = (resultId) => ({
  type: CTRResultsActionTypes.DELETE_CTR_RESULTS_START,
  payload: resultId
});

export const deleteCTRResultsSuccess = (ctrResults) => ({
  type: CTRResultsActionTypes.DELETE_CTR_RESULTS_SUCCESS
});

export const deleteCTRResultsFailure = (error) => ({
  type: CTRResultsActionTypes.DELETE_CTR_RESULTS_FAILURE,
  payload: error
});
