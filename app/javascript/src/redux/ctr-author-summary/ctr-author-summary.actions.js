import CTRAuthorSummaryActionTypes from './ctr-author-summary.types';

export const createCTRAuthorSummaryStart = (ctrAuthorSummaryDetails) => ({
  type: CTRAuthorSummaryActionTypes.CREATE_CTR_AUTHOR_SUMMARY_START,
  payload: ctrAuthorSummaryDetails
});

export const createCTRAuthorSummarySuccess = () => ({
  type: CTRAuthorSummaryActionTypes.CREATE_CTR_AUTHOR_SUMMARY_SUCCESS
});

export const createCTRAuthorSummaryFailure = (error) => ({
  type: CTRAuthorSummaryActionTypes.CREATE_CTR_AUTHOR_SUMMARY_FAILURE,
  payload: error
});
