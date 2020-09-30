import CTRCommentActionTypes from './ctr-comments.types';

export const createCTRCommentStart = (details) => ({
  type: CTRCommentActionTypes.CREATE_COMMENT_START,
  payload: details
});

export const createCTRCommentSuccess = (details) => ({
  type: CTRCommentActionTypes.CREATE_COMMENT_SUCCESS,
  payload: details
});

export const createCTRCommentFailure = (error) => ({
  type: CTRCommentActionTypes.CREATE_COMMENT_FAILURE,
  payload: error
});

export const retrieveCTRCommentStart = (details) => ({
  type: CTRCommentActionTypes.RETRIEVE_COMMENTS_START,
  payload: details
});

export const retrieveCTRCommentSuccess = (details) => ({
  type: CTRCommentActionTypes.RETRIEVE_COMMENTS_SUCCESS,
  payload: details
});

export const retrieveCTRCommentFailure = (error) => ({
  type: CTRCommentActionTypes.RETRIEVE_COMMENTS_FAILURE,
  payload: error
});
