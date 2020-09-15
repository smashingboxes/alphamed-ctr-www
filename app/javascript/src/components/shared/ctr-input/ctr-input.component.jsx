import React from 'react';

import {
  InputContainer,
  GroupContainer,
  FormInputContainer,
  FormInputLabel,
  ErrorSpan,
  FormSpan
} from './ctr-input.styles';

const CTRInput = ({
  handleChange,
  width = '500px',
  label,
  error,
  display,
  require,
  bottomMargin,
  ...props
}) => {
  return (
    <InputContainer>
      <GroupContainer>
        <FormInputLabel display={display}>
          {label} {require ? <FormSpan>*</FormSpan> : null}
        </FormInputLabel>
        <FormInputContainer width={width} onChange={handleChange} {...props} />
        {error ? (
          <ErrorSpan className='error'>&#10005; {error}</ErrorSpan>
        ) : null}
      </GroupContainer>
    </InputContainer>
  );
};

export default CTRInput;
