import React from 'react';
import { AppBar, Toolbar, Button, Grid } from '@material-ui/core';

import { useStyles } from './submission-tabs.styles';

const SubmissionTabs = ({ selected, isSelected }) => {
  const classes = useStyles();

  const startedClick = () =>
    isSelected({
      started: true,
      submitted: false,
      inReview: false,
      revisions: false,
      accepted: false,
      rejected: false,
      published: false
    });

  const submittedClick = () =>
    isSelected({
      started: false,
      submitted: true,
      inReview: false,
      revisions: false,
      accepted: false,
      rejected: false,
      published: false
    });

  const inReviewClick = () =>
    isSelected({
      started: false,
      submitted: false,
      inReview: true,
      revisions: false,
      accepted: false,
      rejected: false,
      published: false
    });

  const revisionsClick = () =>
    isSelected({
      started: false,
      submitted: false,
      inReview: false,
      revisions: true,
      accepted: false,
      rejected: false,
      published: false
    });

  const acceptedClick = () =>
    isSelected({
      started: false,
      submitted: false,
      inReview: false,
      revisions: false,
      accepted: true,
      rejected: false,
      published: false
    });

  const rejectedClick = () =>
    isSelected({
      started: false,
      submitted: false,
      inReview: false,
      revisions: false,
      accepted: false,
      rejected: true,
      published: false
    });

  const publishedClick = () =>
    isSelected({
      started: false,
      submitted: false,
      inReview: false,
      revisions: false,
      accepted: false,
      rejected: false,
      published: true
    });

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        <Grid container>
          <Grid item xs={12}>
            <Toolbar>
              <Button
                onClick={startedClick}
                className={
                  selected.started
                    ? classes.buttonActive
                    : classes.buttonInactive
                }
              >
                Started
              </Button>
              <Button
                onClick={submittedClick}
                className={
                  selected.submitted
                    ? classes.buttonActive
                    : classes.buttonInactive
                }
              >
                Submitted
              </Button>
              <Button
                onClick={inReviewClick}
                className={
                  selected.inReview
                    ? classes.buttonActive
                    : classes.buttonInactive
                }
              >
                In Review
              </Button>
              <Button
                onClick={revisionsClick}
                className={
                  selected.revisions
                    ? classes.buttonActive
                    : classes.buttonInactive
                }
              >
                Revisions Needed
              </Button>
              <Button
                onClick={acceptedClick}
                className={
                  selected.accepted
                    ? classes.buttonActive
                    : classes.buttonInactive
                }
              >
                Accepted
              </Button>
              <Button
                onClick={rejectedClick}
                className={
                  selected.rejected
                    ? classes.buttonActive
                    : classes.buttonInactive
                }
              >
                Rejected
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
