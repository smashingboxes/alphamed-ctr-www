import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './overview.styles';

import SubmissionSidebar from '../../components/shared/submission-sidebar/submission-sidebar.component';
import OverviewForm from '../../components/overview/overview-form/overview-form.container';
import ThirdSidebar from '../../components/shared/third-sidebar/third-sidebar.component';

const OverviewPage = ({
  ctrResult,
  retrieveCTRResultsStart,
  authToken,
  retrieveCTRCommentStart,
  match
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (authToken) {
      retrieveCTRResultsStart(authToken);

      if (match) {
        if (match.params.id !== 'new') {
          retrieveCTRCommentStart(match.params.id, 'overview');
        }
      }
    }
  }, [match, authToken, retrieveCTRResultsStart, retrieveCTRCommentStart]);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={2}>
        <Grid item container direction='column'>
          <SubmissionSidebar category='Overview' ctrResult={ctrResult} />
          <ThirdSidebar />
        </Grid>
      </Grid>
      <Grid item xs={10} className={classes.root}>
        <Grid item container>
          <OverviewForm ctrResult={ctrResult} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OverviewPage;
