import styled, { css } from 'styled-components';

const subColor = '#c4c4c4';
const mainColor = '#000';
const errorColor = '#FF5858';

const shrinkLabelStyles = css`
  top: -20px;
  font-size: 12px;
  color: ${mainColor};
`;

export const ErrorSpan = styled.span`
  font-size: 12px;
  color: ${errorColor};
  margin-left: 5px;
`;

export const GroupContainer = styled.div`
  position: relative;
  margin: 45px 0;

  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;

export const FormInputContainer = styled.input`
  background: none;
  background-color: white;
  color: ${mainColor};
  font-size: 18px;
  padding: 10px;
  display: block;
  width: 200px;
  border: none;
  padding-left: 10px 0;
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

export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  &.shrink {
    ${shrinkLabelStyles}
  }
`;
