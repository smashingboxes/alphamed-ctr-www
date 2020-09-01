import React from 'react';

import {
  GroupContainer,
  FormSelectContainer,
  FormSelectLabel,
  ErrorSpan,
  InputContainer,
  FormSpan
} from './ctr-select.styles';

const CTRSelect = ({
  handleChange,
  width = '500px',
  label,
  error,
  ...props
}) => {
  return (
    <InputContainer>
      <GroupContainer>
        <FormSelectLabel>
          {label} {require ? <FormSpan>*</FormSpan> : null}
        </FormSelectLabel>
        <FormSelectContainer width={width} onChange={handleChange} {...props} />
        {error ? (
          <ErrorSpan className='error'>&#10005; {error}</ErrorSpan>
        ) : null}
      </GroupContainer>
    </InputContainer>
  );
};

export default CTRSelect;
