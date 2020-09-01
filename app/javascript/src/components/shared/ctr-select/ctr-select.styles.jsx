import styled, { css } from 'styled-components';

const subColor = '#c4c4c4';
const mainColor = '#000';
const errorColor = '#FF5858';

const shrinkLabelStyles = css`
  top: -20px;
  font-size: 12px;
  color: ${mainColor};
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 70px;
`;

export const ErrorSpan = styled.span`
  display: block;
  font-size: 12px;
  color: ${errorColor};
  margin-left: 50px;
`;

export const GroupContainer = styled.div`
  display: inline-block;
  margin: 45px 0;

  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;

export const FormSelectContainer = styled.select`
  background: none;
  background-color: white;
  color: ${mainColor};
  font-size: 14px;
  padding: 10px;
  width: ${(props) => props.width};
  border: none;
  padding-left: 10px;
  border-radius: 8px;
  border: 1px solid ${subColor};
  margin: 5px 0;

  &:focus {
    outline: none;
    border: 1px solid ${mainColor};
  }

  &:focus:invalid {
    outline: none;
    border: 1px solid ${errorColor};
  }

  &:focus ~ label {
    ${shrinkLabelStyles}
  }
`;

export const FormSelectLabel = styled.label`
  color: #58285f;
  font-size: 16px;
  font-weight: normal;
  margin-right: 10px;
`;

export const FormSpan = styled.span`
  color: ${errorColor};
  font-size: 12px;
`;
