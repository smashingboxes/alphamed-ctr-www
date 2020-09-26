import styled from 'styled-components';
import { Grid } from '@material-ui/core';

export const OverviewContainer = styled.div`
  background-color: #58285f;
  color: white;
  padding: 10px;
  width: 70vw;
  margin-left: 30px;
`;

export const GridContainer = styled(Grid)`
  padding-left: 40px;
  margin: 20px 0px;
`;

export const OverviewFormContainer = styled.div`
  padding: 10px;
  width: 70vw;
  display: grid;
  direction: row;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  margin: -10px;
`;

export const CheckboxContainer = styled.div``;

export const LabelContainer = styled.div`
  color: #58285f;
  font-size: 1em;
  font-weight: normal;
`;

export const ButtonContainer = styled.div`
  margin: 10px;
`;
