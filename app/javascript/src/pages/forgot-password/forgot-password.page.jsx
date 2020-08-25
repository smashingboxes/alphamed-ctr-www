import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import { useStyles } from './forgot-password.styles';

import ForgotPasswordForm from '../../components/forgot-password/forgot-password-form/forgot-password-form.component';

const ForgotPasswordPage = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} className={classes.form}>
        <Grid container direction='column' justify='center' alignItems='center'>
          <Typography>
            Please submit your email address and we'll send you instructions on
            how to reset your password.
          </Typography>
          <ForgotPasswordForm />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ForgotPasswordPage;
