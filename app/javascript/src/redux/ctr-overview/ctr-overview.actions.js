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
