import React from 'react';

import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel,
  ErrorSpan
} from './form-input.styles';

const FormInput = ({
  handleChange,
  width = '500px',
  label,
  error,
  ...props
}) => {
  return (
    <GroupContainer>
      <FormInputContainer width={width} onChange={handleChange} {...props} />
      {label ? (
        <>
          <FormInputLabel className='shrink'>{label}</FormInputLabel>
          {error ? (
            <ErrorSpan className='error'>&#10005; {error}</ErrorSpan>
          ) : null}
        </>
      ) : null}
    </GroupContainer>
  );
};

export default FormInput;
