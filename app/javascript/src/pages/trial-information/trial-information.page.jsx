import React from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './trial-information.styles';

import SubmissionSidebar from '../../components/shared/submission-sidebar/submission-sidebar.component';
import ThirdSidebar from '../../components/shared/third-sidebar/third-sidebar.component';
import TrailInformationForm from '../../components/trial-information/trail-information-form/trial-information-form.container';

const TrailInformationPage = ({ ctrResult }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={3}>
        <Grid item container direction='column'>
          <SubmissionSidebar category='Trial Information' isChecked={false} />
          <ThirdSidebar />
        </Grid>
      </Grid>
      <Grid item xs={9} className={classes.root}>
        <Grid item container>
          <TrailInformationForm ctrResult={ctrResult} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TrailInformationPage;
