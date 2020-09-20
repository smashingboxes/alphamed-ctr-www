import React from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './co-author-information.styles';

import SubmissionSidebar from '../../components/shared/submission-sidebar/submission-sidebar.component';
import ThirdSidebar from '../../components/shared/third-sidebar/third-sidebar.component';
import CoAuthorForm from '../../components/co-author-information/co-author-information-form/co-author-information-form.container';

const CoAuthorInformationPage = ({ ctrResult }) => {
  const classes = useStyles();

  return (
    <Grid container style={{ height: '75vh' }}>
      <Grid item xs={3}>
        <Grid item container direction='column'>
          <SubmissionSidebar
            category='Co-author Information & Order of Authors'
            isChecked={false}
          />
          <ThirdSidebar />
        </Grid>
      </Grid>
      <Grid item xs={9} className={classes.root}>
        <Grid item container>
          <CoAuthorForm ctrResult={ctrResult} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CoAuthorInformationPage;