import React from 'react';

import { ButtonContainer } from './error-button.styles';

const ErrorButton = ({ children, ...props }) => {
  return <ButtonContainer {...props}>{children}</ButtonContainer>;
};

export default ErrorButton;
