import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const AboutBlock = ({
  header = 'N/A',
  firstDetail = '',
  secondDetail = '',
  thirdDetail = '',
  fourthDetail = '',
  fifthDetail = ''
}) => {
  return (
    <Grid container direction='column'>
      <Grid item xs={12}>
        <Typography variant='h4' color='primary' gutterBottom>
          {header}
        </Typography>
        <Typography variant='body1' gutterBottom>
          {firstDetail}
        </Typography>
        <Typography variant='body1' gutterBottom>
          {secondDetail}
        </Typography>
        <Typography variant='body1' gutterBottom>
          {thirdDetail}
        </Typography>
        <Typography variant='body1' gutterBottom>
          {fourthDetail}
        </Typography>
        <Typography variant='body1' gutterBottom>
          {fifthDetail}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AboutBlock;
