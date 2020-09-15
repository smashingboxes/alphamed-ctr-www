import CTRCoAuthorActionTypes from './ctr-co-author.types';

const INITIAL_STATE = {
  ctrCoAuthorDetails: null,
  error: null
};

const ctrCoAuthorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CTRCoAuthorActionTypes.RETRIEVE_CTR_OVERVIEW_SUCCESS:
      return {
        ...state,
        ctrCoAuthorDetails: action.payload,
        error: null
      };
    case CTRCoAuthorActionTypes.RETRIEVE_CTR_OVERVIEW_FAILURE:
      return {
        ...state,
        ctrCoAuthorDetails: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default ctrCoAuthorReducer;
