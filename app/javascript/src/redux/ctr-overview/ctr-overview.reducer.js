import CTROverviewActionTypes from './ctr-overview.types';

const INITIAL_STATE = {
  ctrOverviewDetails: null,
  ctrComments: null,
  error: null
};

const ctrOverviewReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CTROverviewActionTypes.RETRIEVE_OVERVIEW_COMMENTS_SUCCESS:
    case CTROverviewActionTypes.CREATE_CTR_OVERVIEW_SUCCESS:
      return {
        ...state,
        ctrComments: action.payload,
        error: null
      };
    case CTROverviewActionTypes.RETRIEVE_OVERVIEW_COMMENTS_FAILURE:
    case CTROverviewActionTypes.CREATE_CTR_OVERVIEW_FAILURE:
      return {
        ...state,
        ctrComments: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default ctrOverviewReducer;
