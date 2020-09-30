import styled from 'styled-components';

import PrimaryButton from '../primary-button/primary-button.component';

export const CTRCommentsContainer = styled.div`
  display: flex;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
  background-color: #58285f;
  width: 70vw;
  color: white;
`;

export const SaveButton = styled(PrimaryButton)`
  width: 150px;
`;

export const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const CommentInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  width: 70vw;
  padding: 20px;
`;

export const TextAreaContainer = styled.textarea`
  width: 67vw;
  height: 20vh;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;
