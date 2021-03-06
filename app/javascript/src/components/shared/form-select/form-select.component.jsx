import React from 'react';

import {
  GroupContainer,
  FormSelectContainer,
  FormSelectLabel,
  ErrorSpan
} from './form-select.styles';

const FormSelect = ({
  handleChange,
  width = '500px',
  label,
  error,
  ...props
}) => {
  return (
    <GroupContainer>
      <FormSelectContainer width={width} onChange={handleChange} {...props} />
      {label ? (
        <>
          <FormSelectLabel className='shrink'>{label}</FormSelectLabel>
          {error ? (
            <ErrorSpan className='error'>&#10005; {error}</ErrorSpan>
          ) : null}
        </>
      ) : null}
    </GroupContainer>
  );
};

export default FormSelect;
