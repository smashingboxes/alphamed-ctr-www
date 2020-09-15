import CTRAuthorSummaryActionTypes from './ctr-author-summary.types';

const INITIAL_STATE = {
  ctrAuthorSummaryDetails: null,
  error: null
};

const ctrAuthorSummaryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CTRAuthorSummaryActionTypes.RETRIEVE_CTR_AUTHOR_SUMMARY_SUCCESS:
      return {
        ...state,
        ctrAuthorSummaryDetails: action.payload,
        error: null
      };
    case CTRAuthorSummaryActionTypes.RETRIEVE_CTR_AUTHOR_SUMMARY_FAILURE:
      return {
        ...state,
        ctrAuthorSummaryDetails: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default ctrAuthorSummaryReducer;
