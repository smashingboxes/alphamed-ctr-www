import styled from 'styled-components';

import PrimaryButton from '../primary-button/primary-button.component';
import { Paper } from '@material-ui/core';

export const ButtonContainer = styled(PrimaryButton)`
  margin: 10px;
`;

export const PaperContainer = styled(Paper)`
  margin: 50px 30px;
  z-index: 1000;
`;

export const ButtonMailContainer = styled.a`
  display: block;
  margin: 10px;
  border-radius: 50px;
  border: 1px solid #c4c4c4;
  height: 40px;
  padding: 8px 60px 0 70px;
  background-color: #fff;
  color: #58285f;
  text-decoration: none;
  cursor: pointer;
  width: ${(props) => props.width};

  :hover {
    background-color: #58285f;
    color: #fff;
    border: 1px solid #58285f;
  }

  :focus {
    outline: 0;
  }
`;
