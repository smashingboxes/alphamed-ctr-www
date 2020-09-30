import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './trial-information.styles';

import SubmissionSidebar from '../../components/shared/submission-sidebar/submission-sidebar.component';
import ThirdSidebar from '../../components/shared/third-sidebar/third-sidebar.component';
import TrailInformationForm from '../../components/trial-information/trail-information-form/trial-information-form.container';

const TrailInformationPage = ({
  ctrResult,
  retrieveCTRResultsStart,
  authToken,
  match,
  retrieveCTRCommentStart
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (authToken) {
      retrieveCTRResultsStart(authToken);

      if (match) {
        retrieveCTRCommentStart(match.params.id, 'author_summary');
      }
    }
  }, [authToken, retrieveCTRResultsStart, retrieveCTRCommentStart, match]);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={2}>
        <Grid item container direction='column'>
          <SubmissionSidebar
            category='Trial Information'
            ctrResult={ctrResult}
          />
          <ThirdSidebar />
        </Grid>
      </Grid>
      <Grid item xs={10} className={classes.root}>
        <Grid item container>
          <TrailInformationForm ctrResult={ctrResult} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TrailInformationPage;
