import React from 'react';

import { useStyles } from './submission-sidebar.styles';

import { submissionSteps } from './submission-sidebar.data';

const SubmissionSidebar = ({ category, checked }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>Submission Steps</div>
      {submissionSteps.map((step) => {
        if (step.name === category) {
          step.isActive = true;

          return (
            <div
              className={
                step.isActive ? classes.itemsActive : classes.itemsInactive
              }
              key={step.id}
            >
              {step.name}
            </div>
          );
        }

        step.isActive = false;

        return (
          <div
            className={
              step.isActive ? classes.itemsActive : classes.itemsInactive
            }
            key={step.id}
          >
            {step.name}
          </div>
        );
      })}
    </div>
  );
};

export default SubmissionSidebar;
