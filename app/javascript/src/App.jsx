import React from 'react';
import { GlobalStyle } from '../packs/global.styles';
import PrimaryButton from './components/shared/primary-button/primary-button.component';
import SecondaryButton from './components/shared/secondary-button/secondary-button.component';
import ErrorButton from './components/shared/error-button /error-button.component';

const App = () => {
  const handleClick = () => alert('hello');

  return (
    <div>
      <GlobalStyle />
      <PrimaryButton onClick={handleClick}>Primary Button</PrimaryButton>
      <SecondaryButton onClick={handleClick}>Secondary Button</SecondaryButton>
      <ErrorButton onClick={handleClick}>Error Button</ErrorButton>
    </div>
  );
};

export default App;
