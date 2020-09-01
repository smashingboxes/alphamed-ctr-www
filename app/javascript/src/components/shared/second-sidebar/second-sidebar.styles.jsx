import styled from 'styled-components';
import { Paper } from '@material-ui/core';

import PrimaryButton from '../primary-button/primary-button.component';

export const ButtonContainer = styled(PrimaryButton)`
  margin: 10px;

  background-color: ${(props) => (props.active ? '#58285f' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#58285f')};
  border: ${(props) =>
    props.active ? '1px solid #58285f' : '1px solid #c4c4c4'};
`;

export const PaperContainer = styled(Paper)`
  margin: 50px 30px;
`;
