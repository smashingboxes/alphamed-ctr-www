import React from 'react';
import { Paper, Grid } from '@material-ui/core';

import { CTRCommentsContainer, ButtonContainer } from './ctr-comments.styles';
import PrimaryButton from '../primary-button/primary-button.component';

const YourInformationComments = () => {
  return (
    <Paper elevation={0}>
      <Grid container direction='row'>
        <Grid item xs={10}>
          <CTRCommentsContainer>
            Author Information Comments
          </CTRCommentsContainer>
        </Grid>
        <Grid item xs={2}>
          <ButtonContainer>
            <PrimaryButton>Add Comment</PrimaryButton>
          </ButtonContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default YourInformationComments;
