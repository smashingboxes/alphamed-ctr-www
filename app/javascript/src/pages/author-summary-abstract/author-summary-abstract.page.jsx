import React from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './author-summary-abstract.styles';

import SubmissionSidebar from '../../components/shared/submission-sidebar/submission-sidebar.component';
import ThirdSidebar from '../../components/shared/third-sidebar/third-sidebar.component';
import AuthorSummaryAbstractForm from '../../components/author-summary-abstract/author-summary-abstract-form/author-summary-abstract-form.container';

const AuthorSummaryAbstractPage = ({ ctrResult }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={3}>
        <Grid item container direction='column'>
          <SubmissionSidebar
            category='Author Summary/Abstract'
            isChecked={false}
          />
          <ThirdSidebar />
        </Grid>
      </Grid>
      <Grid item xs={9} className={classes.root}>
        <Grid item container>
          <AuthorSummaryAbstractForm ctrResult={ctrResult} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthorSummaryAbstractPage;
