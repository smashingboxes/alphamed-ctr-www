import React from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './edit-profile.styles';

import EditProfileForm from '../../components/edit-profile/edit-profile-form/edit-profile-form.container';

const EditProfilePage = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} className={classes.form}>
        <Grid container justify='center' alignItems='center'>
          <EditProfileForm />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditProfilePage;
