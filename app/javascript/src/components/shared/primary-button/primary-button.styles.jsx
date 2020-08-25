import styled from 'styled-components';

export const ButtonContainer = styled.button`
  border-radius: 50px;
  border: 1px solid #c4c4c4;
  height: 40px;
  padding: 0 20px;
  background-color: #fff;
  color: #58285f;
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
