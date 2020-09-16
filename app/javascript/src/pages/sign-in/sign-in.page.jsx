import React from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './sign-in.styles';

import SignInForm from '../../components/sign-in/sign-in-form/sign-in-form.container';

const SignInPage = () => {
  const classes = useStyles();

  return (
    <Grid container style={{ height: '75vh' }}>
      <Grid item xs={12} className={classes.form}>
        <Grid container justify='center' alignItems='center'>
          <SignInForm />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignInPage;
