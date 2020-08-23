import React from 'react';
import { Paper, Grid } from '@material-ui/core';

import { OverviewContainer, ButtonContainer } from './overview-comments.styles';

import SecondaryButton from '../../shared/secondary-button/secondary-button.component';

const OverviewComments = () => {
  return (
    <Paper elevation={0}>
      <Grid container direction='column'>
        <Grid item xs={12}>
          <OverviewContainer>Author Information Comments</OverviewContainer>
        </Grid>
        <Grid item xs={12}>
          <Grid item container justify='center'>
            <ButtonContainer>
              <SecondaryButton>Save</SecondaryButton>
            </ButtonContainer>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OverviewComments;
