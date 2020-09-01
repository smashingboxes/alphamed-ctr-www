import React from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './sign-up.styles';

import SignUpForm from '../../components/sign-up/sign-up-form/sign-up-form.container';

const SignUpPage = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} className={classes.form}>
        <Grid container justify='center' alignItems='center'>
          <SignUpForm />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignUpPage;
