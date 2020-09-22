import React from 'react';

import {
  GroupContainer,
  FormSelectContainer,
  FormSelectLabel,
  ErrorSpan,
  InputContainer,
  FormSpan
} from './ctr-select.styles';

import { Grid } from '@material-ui/core';

const CTRSelect = ({
  handleChange,
  width = '500px',
  label,
  error,
  require,
  ...props
}) => {
  return (
    <Grid style={{ paddingLeft: 40, margin: "20px 0px" }} container alignItems="start" spacing={1}>
      <Grid item xs={3} style={{ textAlign: "right", paddingTop: "15px" }}>
       <FormSelectLabel>{label}</FormSelectLabel> {require ? <FormSpan>*</FormSpan> : null}
      </Grid>
      <Grid container direction="column" alignItems="start" justify="flex-start" item xs={9}>
        <FormSelectContainer width={width} onChange={handleChange} {...props} />
        {error ? (
          <ErrorSpan className='error'>&#10005; {error}</ErrorSpan>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default CTRSelect;
