import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import { useStyles } from './page-not-found.styles';

const PageNotFoundPage = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} className={classes.root}>
        <Grid container direction='column' justify='center' alignItems='center'>
          <Typography color='primary' variant='h2' gutterBottom>
            Page not Found
          </Typography>
          <Typography variant='body1' gutterBottom>
            Sorry, we can't find the page. It might be an old link or maybe it
            was removed.
          </Typography>
          <NavLink to='/'>Go Back</NavLink>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PageNotFoundPage;
