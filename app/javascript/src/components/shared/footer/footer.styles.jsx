import styled from 'styled-components';

export const FooterContainer = styled.div`
  background-color: whitesmoke;
  width: 100vw;
  height: 120px;
  padding: 10px;
`;

export const FooterText = styled.p`
  font-size: 13px;
  margin-bottom: 5px;
`;

export const FooterLinks = styled.a`
  text-decoration: none;
  color: #000;

  &::visited,
  &:active {
    color: #000;
  }
`;

export const STOImageContainer = styled.img`
  width: 263px;
  height: 55px;
  margin-right: 20px;
`;

export const TOImageContainer = styled.img`
  width: 263px;
  height: 80px;
  margin-left: 10px;
`;
