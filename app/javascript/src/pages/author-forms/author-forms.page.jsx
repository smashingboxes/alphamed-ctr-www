import React from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './author-forms.styles';

import SubmissionSidebar from '../../components/shared/submission-sidebar/submission-sidebar.component';
import ThirdSidebar from '../../components/shared/third-sidebar/third-sidebar.component';
import AuthorFormsContainer from '../../components/author-forms/author-forms-form/author-forms-form.container';

const AuthorFormsPage = ({ ctrResult }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={3}>
        <Grid item container direction='column'>
          <SubmissionSidebar category='Author Forms' isChecked={false} />
          <ThirdSidebar />
        </Grid>
      </Grid>
      <Grid item xs={9} className={classes.root}>
        <Grid item container>
          <AuthorFormsContainer ctrResult={ctrResult} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthorFormsPage;
