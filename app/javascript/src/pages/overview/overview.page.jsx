import React from 'react';
import { Grid } from '@material-ui/core';

import SubmissionSidebar from '../../components/shared/submission-sidebar/submission-sidebar.component';
import OverviewForm from '../../components/overview/overview-form/overview-form.component';
import ThirdSidebar from '../../components/shared/third-sidebar/third-sidebar.component';
import OverviewComments from '../../components/overview/overview-comments/overview-comments.component';

const OverviewPage = () => {
  return (
    <Grid container>
      <Grid item xs={3}>
        <Grid item container>
          <SubmissionSidebar />
        </Grid>
      </Grid>
      <Grid item xs={9}>
        <Grid item container>
          <OverviewForm />
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <ThirdSidebar />
      </Grid>
      <Grid item xs={9}>
        <OverviewComments />
      </Grid>
    </Grid>
  );
};

export default OverviewPage;
