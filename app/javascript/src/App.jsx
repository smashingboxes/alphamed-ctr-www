import React, { useState } from 'react';
import { GlobalStyle } from '../packs/global.styles';
import PrimaryButton from './components/shared/primary-button/primary-button.component';
import SecondaryButton from './components/shared/secondary-button/secondary-button.component';
import ErrorButton from './components/shared/error-button /error-button.component';
import Checkbox from './components/shared/checkbox/checkbox.component';

const App = () => {
  const [checked, setChecked] = useState(false);
  const handleClick = () => alert('hello');
  const handleCheck = (event) => setChecked(event.target.checked);

  return (
    <div>
      <GlobalStyle />
      Buttons
      <br />
      <PrimaryButton onClick={handleClick}>Primary Button</PrimaryButton>
      <SecondaryButton onClick={handleClick}>Secondary Button</SecondaryButton>
      <ErrorButton onClick={handleClick}>Error Button</ErrorButton>
      <br />
      Checkbox
      <br />
      <label>
        <Checkbox checked={checked} onChange={handleCheck} />
        <span style={{ marginLeft: 8 }}>Label Text</span>
      </label>
    </div>
  );
};

export default App;
