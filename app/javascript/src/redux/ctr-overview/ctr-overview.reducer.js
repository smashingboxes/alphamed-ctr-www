import CTROverviewActionTypes from './ctr-overview.types';

const INITIAL_STATE = {
  ctrOverviewDetails: null,
  error: null
};

const ctrOverviewReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CTROverviewActionTypes.RETRIEVE_CTR_OVERVIEW_SUCCESS:
      return {
        ...state,
        ctrOverviewDetails: action.payload,
        error: null
      };
    case CTROverviewActionTypes.RETRIEVE_CTR_OVERVIEW_FAILURE:
      return {
        ...state,
        ctrOverviewDetails: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default ctrOverviewReducer;
