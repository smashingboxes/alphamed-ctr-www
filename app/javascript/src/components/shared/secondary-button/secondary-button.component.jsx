import React from 'react';

import { ButtonContainer } from './secondary-button.styles';

const SecondaryButton = ({ children, ...props }) => {
  return <ButtonContainer {...props}>{children}</ButtonContainer>;
};

export default SecondaryButton;
