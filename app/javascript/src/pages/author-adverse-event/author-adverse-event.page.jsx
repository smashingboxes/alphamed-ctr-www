import React from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './author-adverse-event.styles';

import SubmissionSidebar from '../../components/shared/submission-sidebar/submission-sidebar.component';
import ThirdSidebar from '../../components/shared/third-sidebar/third-sidebar.component';
import AuthorAdverseEventForm from '../../components/author-adverse-event/author-adverse-event-form/author-adverse-event-form.container';

const AuthorAdverseEventPage = ({ ctrResult }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={2}>
        <Grid item container direction='column'>
          <SubmissionSidebar category='Adverse Events' isChecked={false} />
          <ThirdSidebar />
        </Grid>
      </Grid>
      <Grid item xs={10} className={classes.root}>
        <Grid item container>
          <AuthorAdverseEventForm ctrResult={ctrResult} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthorAdverseEventPage;
