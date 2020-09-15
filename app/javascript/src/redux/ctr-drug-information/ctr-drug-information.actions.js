import CTRDrugInformationActionTypes from './ctr-drug-information.types';

export const createCTRDrugInformationStart = (ctrDrugInformationDetails) => ({
  type: CTRDrugInformationActionTypes.CREATE_CTR_DRUG_INFORMATION_START,
  payload: ctrDrugInformationDetails
});

export const createCTRDrugInformationSuccess = () => ({
  type: CTRDrugInformationActionTypes.CREATE_CTR_DRUG_INFORMATION_SUCCESS
});

export const createCTRDrugInformationFailure = (error) => ({
  type: CTRDrugInformationActionTypes.CREATE_CTR_DRUG_INFORMATION_FAILURE,
  payload: error
});
