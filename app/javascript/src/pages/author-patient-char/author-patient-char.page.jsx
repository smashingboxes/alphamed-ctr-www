import React from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './author-patient-char.styles';

import SubmissionSidebar from '../../components/shared/submission-sidebar/submission-sidebar.component';
import ThirdSidebar from '../../components/shared/third-sidebar/third-sidebar.component';
import AuthorPatientCharForm from '../../components/author-patient-char/author-patient-char-form/author-patient-char-form.container';

const AuthorPatientCharPage = ({ ctrResult }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={2}>
        <Grid item container direction='column'>
          <SubmissionSidebar category='Patient Characteristics' isChecked={false} />
          <ThirdSidebar />
        </Grid>
      </Grid>
      <Grid item xs={10} className={classes.root}>
        <Grid item container>
          <AuthorPatientCharForm ctrResult={ctrResult} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthorPatientCharPage;
