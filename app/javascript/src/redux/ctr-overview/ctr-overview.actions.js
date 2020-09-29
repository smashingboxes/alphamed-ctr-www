import CTROverviewActionTypes from './ctr-overview.types';

export const createCTROverviewStart = (ctrOverviewDetails) => ({
  type: CTROverviewActionTypes.CREATE_CTR_OVERVIEW_START,
  payload: ctrOverviewDetails
});

export const createCTROverviewSuccess = () => ({
  type: CTROverviewActionTypes.CREATE_CTR_OVERVIEW_SUCCESS
});

export const createCTROverviewFailure = (error) => ({
  type: CTROverviewActionTypes.CREATE_CTR_OVERVIEW_FAILURE,
  payload: error
});

export const createCTRCommentsStart = (ctrCommentDetails) => ({
  type: CTROverviewActionTypes.CREATE_OVERVIEW_COMMENT_START,
  payload: ctrCommentDetails
});

export const createCTRCommentsSuccess = (ctrDetails) => ({
  type: CTROverviewActionTypes.CREATE_OVERVIEW_COMMENT_SUCCESS,
  payload: ctrDetails
});

export const createCTRCommentsFailure = (error) => ({
  type: CTROverviewActionTypes.CREATE_OVERVIEW_COMMENT_FAILURE,
  payload: error
});

export const retrieveOverviewCommentsStart = (resultId) => ({
  type: CTROverviewActionTypes.RETRIEVE_OVERVIEW_COMMENTS_START,
  payload: resultId
});

export const retrieveOverviewCommentsSuccess = (ctrComments) => ({
  type: CTROverviewActionTypes.RETRIEVE_OVERVIEW_COMMENTS_SUCCESS,
  payload: ctrComments
});

export const retrieveOverviewCommentsFailure = (error) => ({
  type: CTROverviewActionTypes.RETRIEVE_OVERVIEW_COMMENTS_FAILURE,
  payload: error
});
