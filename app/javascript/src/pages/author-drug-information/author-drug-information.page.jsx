import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';

import { useStyles } from './author-drug-information.styles';

import SubmissionSidebar from '../../components/shared/submission-sidebar/submission-sidebar.component';
import ThirdSidebar from '../../components/shared/third-sidebar/third-sidebar.component';
import AuthorDrugInformationForm from '../../components/author-drug-information/author-drug-information-form/author-drug-information-form.container';

const AuthorDrugInformationPage = ({
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
          retrieveCTRCommentStart(match.params.id, 'drug_information');
        }
      }
    }
  }, [match, authToken, retrieveCTRResultsStart, retrieveCTRCommentStart]);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={3}>
        <Grid item container direction='column'>
          <SubmissionSidebar
            category='Drug Information'
            ctrResult={ctrResult}
          />
          <ThirdSidebar />
        </Grid>
      </Grid>
      <Grid item xs={9} className={classes.root}>
        <Grid item container>
          <AuthorDrugInformationForm ctrResult={ctrResult} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthorDrugInformationPage;
