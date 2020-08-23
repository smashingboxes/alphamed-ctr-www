import styled from 'styled-components';
import { TextField } from '@material-ui/core';

export const DisclosureFormContainer = styled.div`
  border: 1px solid gray;
  width: 700px;
  margin: 10px 0;
`;

export const HeaderContainer = styled.div`
  background-color: #58285f;
  color: white;
  padding: 10px;
`;

export const SubHeaderContainer = styled.div`
  background-color: #917495;
  color: #58285f;
  text-transform: uppercase;
  margin: 0 10px;
  margin-top: 10px;
  padding: 5px;
`;

export const DetailsContainer = styled.div`
  margin: 10px 20px;
`;

export const NoticeContainer = styled.div`
  margin: 10px 20px;
  color: red;
  text-transform: uppercase;
`;

export const AuthorContainer = styled.ul`
  list-style-type: circle;
`;

export const AuthorItem = styled.li`
  margin: 10px 10px 10px 35px;
`;

export const CheckboxContainer = styled.div`
  margin: 10px 20px;
`;

export const TextFieldContainer = styled(TextField)`
  font-size: 8px;
  width: 400px;
`;
