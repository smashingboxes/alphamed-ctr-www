import React from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './author-pharma.styles';

import SubmissionSidebar from '../../components/shared/submission-sidebar/submission-sidebar.component';
import ThirdSidebar from '../../components/shared/third-sidebar/third-sidebar.component';
import AuthorPharmaContainer from '../../components/author-pharma/author-pharma-form.container';

const AuthorPharmaPage = ({ ctrResult }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={3}>
        <Grid item container direction='column'>
          <SubmissionSidebar category='Pharmacokinetics & Pharmacodynamics' isChecked={false} />
          <ThirdSidebar />
        </Grid>
      </Grid>
      <Grid item xs={9} className={classes.root}>
        <Grid item container>
          <AuthorPharmaContainer ctrResult={ctrResult} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthorPharmaPage;
