import React from 'react';

import {
  FormInputContainer,
  FormInputLabel,
  ErrorSpan,
  FormSpan
} from './ctr-input.styles';

import { Grid } from '@material-ui/core';

const CTRInput = ({
  handleChange,
  width = '500px',
  label,
  error,
  display,
  require,
  bottomMargin,
  left = 3,
  right = 9,
  ...props
}) => {
  return (
    <Grid
      style={{ paddingLeft: 40, margin: '20px 0px' }}
      container
      alignItems='flex-start'
      spacing={1}
      {...props}
    >
      <Grid item xs={left} style={{ textAlign: 'right', paddingTop: '15px' }}>
        <FormInputLabel>{label}</FormInputLabel>
        {require ? <FormSpan>*</FormSpan> : null}
      </Grid>
      <Grid
        container
        direction='column'
        alignItems='flex-start'
        justify='flex-start'
        item
        xs={right}
      >
        <FormInputContainer width={width} onChange={handleChange} {...props} />
        {error ? (
          <ErrorSpan className='error'>&#10005; {error}</ErrorSpan>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default CTRInput;
