import CTRTrailInformationActionTypes from './ctr-trail-information.types';

export const createCTRTrailInformationStart = (ctrTrailInformationDetails) => ({
  type: CTRTrailInformationActionTypes.CREATE_CTR_TRAIL_INFORMATION_START,
  payload: ctrTrailInformationDetails
});

export const createCTRTrailInformationSuccess = () => ({
  type: CTRTrailInformationActionTypes.CREATE_CTR_TRAIL_INFORMATION_SUCCESS
});

export const createCTRTrailInformationFailure = (error) => ({
  type: CTRTrailInformationActionTypes.CREATE_CTR_TRAIL_INFORMATION_FAILURE,
  payload: error
});
