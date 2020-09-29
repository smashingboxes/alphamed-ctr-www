import CTRCommentActionTypes from './ctr-comments.types';

const INITIAL_STATE = {
  ctrComments: [],
  error: null
};

const ctrCommentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CTRCommentActionTypes.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        ctrComments: [...state.ctrComments, action.payload],
        error: null
      };
    case CTRCommentActionTypes.RETRIEVE_COMMENTS_SUCCESS:
      return {
        ...state,
        ctrComments: action.payload,
        error: null
      };
    case CTRCommentActionTypes.CREATE_COMMENT_FAILURE:
    case CTRCommentActionTypes.RETRIEVE_COMMENTS_FAILURE:
      return {
        ...state,
        ctrComments: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default ctrCommentsReducer;
