import React from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './your-information.styles';

import SubmissionSidebar from '../../components/shared/submission-sidebar/submission-sidebar.component';
import YourInformationForm from '../../components/your-information/your-information-form/your-information-form.container';
import ThirdSidebar from '../../components/shared/third-sidebar/third-sidebar.component';

const YourInformationPage = ({ ctrResult }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={3}>
        <Grid item container direction='column'>
          <SubmissionSidebar category='Your Information' isChecked={false} />
          <ThirdSidebar />
        </Grid>
      </Grid>
      <Grid item xs={9} className={classes.root}>
        <Grid item container>
          <YourInformationForm ctrResult={ctrResult} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default YourInformationPage;