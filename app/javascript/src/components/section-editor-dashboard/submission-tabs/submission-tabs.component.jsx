import React from 'react';
import { AppBar, Toolbar, Button, Grid } from '@material-ui/core';

import { useStyles } from './submission-tabs.styles';

const SubmissionTabs = ({ selected, isSelected }) => {
  const classes = useStyles();

  const originalSubmissionsClick = () =>
    isSelected({
      originalSubmissions: true,
      revisions: false,
      published: false
    });

  const revisionsClick = () =>
    isSelected({
      originalSubmissions: false,
      revisions: true,
      published: false
    });

  const publishedClick = () =>
    isSelected({
      originalSubmissions: false,
      revisions: false,
      published: true
    });

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        <Grid container>
          <Grid item xs={12}>
            <Toolbar>
              <Button
                onClick={originalSubmissionsClick}
                className={
                  selected.originalSubmissions
                    ? classes.buttonActive
                    : classes.buttonInactive
                }
              >
                Original Submissions
              </Button>
              <Button
                onClick={revisionsClick}
                className={
                  selected.revisions
                    ? classes.buttonActive
                    : classes.buttonInactive
                }
              >
                Revisions
              </Button>
              <Button
                onClick={publishedClick}
                className={
                  selected.published
                    ? classes.buttonActive
                    : classes.buttonInactive
                }
              >
                Published
              </Button>
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
};

export default SubmissionTabs;
