import React from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './author-submission-overview.styles';

import SubmissionSidebar from '../../components/shared/submission-sidebar/submission-sidebar.component';
import ThirdSidebar from '../../components/shared/third-sidebar/third-sidebar.component';
import AuthorSubmissionOverviewForm from '../../components/author-submission-overview/author-submission-overview-form/author-submission-overview.container';

const AuthorSubmissionOverviewPage = ({ ctrResult }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={3}>
        <Grid item container direction='column'>
          <SubmissionSidebar category='Submission Overview' isChecked={false} />
          <ThirdSidebar />
        </Grid>
      </Grid>
      <Grid item xs={9} className={classes.root}>
        <Grid item container>
          <AuthorSubmissionOverviewForm ctrResult={ctrResult} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthorSubmissionOverviewPage;
