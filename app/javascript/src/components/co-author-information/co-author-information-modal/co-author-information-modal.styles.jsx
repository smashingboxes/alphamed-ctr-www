import styled from 'styled-components';
import { Modal } from '@material-ui/core';

export const ModalContainer = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-left: 17px;
`;

export const PaperContainer = styled.div`
  border-radius: 5px;
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  padding: 20px;
`;

export const CoAuthorContainer = styled.div`
  background-color: #58285f;
  color: white;
  padding: 10px;
  width: 50vw;
`;

export const CoAuthorFormContainer = styled.div`
 
`;

export const FormContainer = styled.div`
  margin: 0px;
`;

export const InstitutionContainer = styled.div`
  margin-left: 20px;
`;

export const RemoveButton = styled.div`
  background-color: red;
  color: white;
  height: 20px;
  width: 20px;
  border-radius: 20px;
  cursor: pointer;
`;

export const AddButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const AddButton = styled.div`
  background-color: #6edd47;
  height: 10px;
  color: white;
  width: 20px;
  margin-left: -10px;
  margin-right: 10px;
  height: 20px;
  border-radius: 20px;
`;

export const InstitutionFormContainer = styled.div`
  display: flex;
`;

export const ButtonContainer = styled.div`
  margin: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

export const ButtonMarginLeftContainer = styled.div`
  margin-left: 10px;
`;
