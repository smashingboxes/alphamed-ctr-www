import React from 'react';

import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel,
  ErrorSpan
} from './form-input.styles';

const FormInput = ({ handleChange, label, error, ...props }) => {
  return (
    <GroupContainer>
      <FormInputContainer onChange={handleChange} {...props} />
      {label ? (
        <>
          <FormInputLabel className={props.value.length ? 'shrink' : ''}>
            {label}
          </FormInputLabel>
          {error ? (
            <ErrorSpan className='error'>&#10005; {error}</ErrorSpan>
          ) : null}
        </>
      ) : null}
    </GroupContainer>
  );
};

export default FormInput;
