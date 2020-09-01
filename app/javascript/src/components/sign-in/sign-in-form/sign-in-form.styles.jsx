import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PrimaryButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ForgotPasswordLink = styled(Link)`
  margin-top: 20px;
  text-decoration: none;
  color: #000;

  &:hover,
  &:active,
  &:visited {
    color: #000;
  }
`;
