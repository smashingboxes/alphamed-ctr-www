import React from 'react';

import { useStyles } from './submission-sidebar.styles';

import { submissionSteps } from './submission-sidebar.data';

const SubmissionSidebar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>Submission Steps</div>
      {submissionSteps.map((step) => (
        <div
          className={
            step.isActive ? classes.itemsActive : classes.itemsInactive
          }
          key={step.id}
        >
          {step.name}
        </div>
      ))}
    </div>
  );
};

export default SubmissionSidebar;
