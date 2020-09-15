import CTRCoAuthorActionTypes from './ctr-co-author.types';

export const createCTRCoAuthorStart = (ctrCoAuthorDetails) => ({
  type: CTRCoAuthorActionTypes.CREATE_CTR_CO_AUTHOR_START,
  payload: ctrCoAuthorDetails
});

export const createCTRCoAuthorSuccess = () => ({
  type: CTRCoAuthorActionTypes.CREATE_CTR_CO_AUTHOR_SUCCESS
});

export const createCTRCoAuthorFailure = (error) => ({
  type: CTRCoAuthorActionTypes.CREATE_CTR_CO_AUTHOR_FAILURE,
  payload: error
});
