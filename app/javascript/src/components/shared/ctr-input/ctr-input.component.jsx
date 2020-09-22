import React from 'react';

import {
  InputContainer,
  GroupContainer,
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
  ...props
}) => {
  return (
    <Grid style={{ paddingLeft: 40, margin: "20px 0px" }} container alignItems="start" spacing={1}>
      <Grid item xs={3} style={{ textAlign: "right", paddingTop: "15px" }}>
        <FormInputLabel>{label}</FormInputLabel>{require ? <FormSpan>*</FormSpan> : null}
      </Grid>
      <Grid container direction="column" alignItems="start" justify="flex-start" item xs={9}>
      <FormInputContainer width={width} onChange={handleChange} {...props} />
        {error ? (
          <ErrorSpan className='error'>&#10005; {error}</ErrorSpan>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default CTRInput;
