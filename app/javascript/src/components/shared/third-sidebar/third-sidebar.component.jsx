import React from 'react';
import { Grid } from '@material-ui/core';

import {
  ButtonContainer,
  PaperContainer,
  ButtonMailContainer
} from './third-sidebar.styles';

const ThirdSidebar = () => {
  const goToSiteTerms = () =>
    window.open(
      'https://clinicaltrials.gov/ct2/about-studies/glossary',
      '_blank'
    );

  const goToSubmissionStepsSite = () =>
    window.open(
      'https://theoncologistcommunity.com/sites/default/files/CTR_SubmissionProcessStepsandFAQ_2020.pdf'
    );

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item container direction='column' justify='center' xs={4}>
        <PaperContainer elevation={0}>
          <ButtonContainer width='200px' onClick={goToSiteTerms}>
            Common Site Terms
          </ButtonContainer>
          <ButtonContainer width='200px' onClick={goToSubmissionStepsSite}>
            Submission Steps
          </ButtonContainer>
          <ButtonMailContainer
            width='200px'
            href='mailto:editorialoffice@ctr.theoncologist.com?subject=Clinical Trial Results Website Support'
          >
            Get Help
          </ButtonMailContainer>
        </PaperContainer>
      </Grid>
    </Grid>
  );
};

export default ThirdSidebar;
