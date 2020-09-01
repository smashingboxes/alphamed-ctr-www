import React from 'react';
import { Grid } from '@material-ui/core';

import { ButtonContainer, PaperContainer } from './ctr-sidebar.styles';

const CTRSidebar = ({ user, history, isAuthenticated }) => {
  const goToPublishSite = () =>
    window.open(
      'https://theoncologist.onlinelibrary.wiley.com/page/journal/1549490x/homepage/clinical-trial-results',
      '_blank'
    );

  const goToSubmissionStepsSite = () =>
    window.open(
      'https://theoncologistcommunity.com/sites/default/files/CTR_SubmissionProcessStepsandFAQ_2020.pdf'
    );

  const goToCTROverview = () =>
    isAuthenticated
      ? history.push('/submission/results/new')
      : history.push('/sign-in');

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item container direction='column' justify='center' xs={4}>
        <PaperContainer elevation={0}>
          {user && user.user_type === 2 ? null : (
            <ButtonContainer width='200px' onClick={goToCTROverview}>
              Submit your Clinical Trial Results
            </ButtonContainer>
          )}
          <ButtonContainer width='200px' onClick={goToPublishSite}>
            Publish Clinical Trial Results
          </ButtonContainer>
          <ButtonContainer width='200px' onClick={goToSubmissionStepsSite}>
            Submission Steps
          </ButtonContainer>
        </PaperContainer>
      </Grid>
    </Grid>
  );
};

export default CTRSidebar;
