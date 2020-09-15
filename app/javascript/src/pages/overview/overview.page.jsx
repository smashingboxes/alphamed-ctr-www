import React from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './overview.styles';

import SubmissionSidebar from '../../components/shared/submission-sidebar/submission-sidebar.component';
import OverviewForm from '../../components/overview/overview-form/overview-form.container';
import ThirdSidebar from '../../components/shared/third-sidebar/third-sidebar.component';

const OverviewPage = ({ ctrResult }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={3}>
        <Grid item container direction='column'>
          <SubmissionSidebar category='Overview' isChecked={false} />
          <ThirdSidebar />
        </Grid>
      </Grid>
      <Grid item xs={9} className={classes.root}>
        <Grid item container>
          <OverviewForm ctrResult={ctrResult} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OverviewPage;
