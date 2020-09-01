import React from 'react';
import { Paper, Grid } from '@material-ui/core';

import { OverviewContainer } from './overview-comments.styles';

const OverviewComments = () => {
  return (
    <Paper elevation={0}>
      <Grid container direction='column'>
        <Grid item xs={12}>
          <OverviewContainer>Author Information Comments</OverviewContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OverviewComments;
