import React from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './author-primary-assessment.styles';

import SubmissionSidebar from '../../components/shared/submission-sidebar/submission-sidebar.component';
import ThirdSidebar from '../../components/shared/third-sidebar/third-sidebar.component';
import AuthorPrimaryAssessmentForm from '../../components/author-primary-assessment/author-primary-assessment-form/author-primary-assessment-form.container';

const AuthorPrimaryAssessmentPage = ({ ctrResult }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={2}>
        <Grid item container direction='column'>
          <SubmissionSidebar category='Primary Assessment Method' isChecked={false} />
          <ThirdSidebar />
        </Grid>
      </Grid>
      <Grid item xs={10} className={classes.root}>
        <Grid item container>
          <AuthorPrimaryAssessmentForm ctrResult={ctrResult} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthorPrimaryAssessmentPage;
