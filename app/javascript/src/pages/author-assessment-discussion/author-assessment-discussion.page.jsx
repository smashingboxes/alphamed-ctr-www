import React from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './author-assessment-discussion.styles';

import SubmissionSidebar from '../../components/shared/submission-sidebar/submission-sidebar.component';
import ThirdSidebar from '../../components/shared/third-sidebar/third-sidebar.component';
import AuthorAssessmentDiscussionContainer from '../../components/author-assessment-discussion/author-assessment-discussion-form/author-assessment-discussion-form.container'

const AuthorAssessmentDiscussionPage = ({ ctrResult }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={2}>
        <Grid item container direction='column'>
          <SubmissionSidebar category='Assessment, Analysis & Discussion' isChecked={false} />
          <ThirdSidebar />
        </Grid>
      </Grid>
      <Grid item xs={10} className={classes.root}>
        <Grid item container>
          <AuthorAssessmentDiscussionContainer ctrResult={ctrResult} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthorAssessmentDiscussionPage;
