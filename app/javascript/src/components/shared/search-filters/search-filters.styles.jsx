import styled from 'styled-components';
import { Paper } from '@material-ui/core';

import ErrorButton from '../error-button/error-button.component';

export const PaperContainer = styled(Paper)`
  position: absolute;
  padding: 5px 20px;
  right: 87px;
  z-index: 1000;
`;

export const CloseButtonContainer = styled.button`
  cursor: pointer;
  border: none;
  background-color: #fff;
  font-size: 20px;

  :focus {
    outline: 0;
  }
`;

export const ErrorButtonContainer = styled(ErrorButton)`
  margin-left: -20px;
  margin-right: 15px;
`;

export const ButtonsContainer = styled.div`
  margin-bottom: 20px;
  margin-top: -25px;
`;
