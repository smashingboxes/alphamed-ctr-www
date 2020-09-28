import CTRYourInformationTypes from './ctr-your-information.types';

export const createCTRYourInformationStart = (ctrYourInformationDetails) => ({
  type: CTRYourInformationTypes.CREATE_CTR_YOUR_INFORMATION_START,
  payload: ctrYourInformationDetails
});

export const createCTRYourInformationSuccess = () => ({
  type: CTRYourInformationTypes.CREATE_CTR_YOUR_INFORMATION_SUCCESS
});

export const createCTRYourInformationFailure = (error) => ({
  type: CTRYourInformationTypes.CREATE_CTR_YOUR_INFORMATION_FAILURE,
  payload: error
});
