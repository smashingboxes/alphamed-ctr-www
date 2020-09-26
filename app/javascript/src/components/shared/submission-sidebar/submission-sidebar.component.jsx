import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import Checkbox from '../checkbox/checkbox.component';

import { useStyles } from './submission-sidebar.styles';

import { submissionSteps } from './submission-sidebar.data';
import { swalMessage } from '../swal-message/swal-message';

const SubmissionSidebar = ({ category, ctrResult }) => {
  let [counter, setCounter] = useState(0);
  const [id, setId] = useState('');
  const classes = useStyles();

  useEffect(() => {
    if (ctrResult) {
      ctrResult[0] ? setCounter(ctrResult[0].result_count) : setCounter(1);
      ctrResult[0] ? setId(ctrResult[0]._id.$oid) : setId('');
    }
  }, [ctrResult, setCounter]);

  const goToSubmissionStep = (location, id) => {
    if (id === '') {
      return swalMessage('Something went wrong!', 'error');
    }

    if (location === 'overview') {
      return (window.location.href = `/submission/results/${id}`);
    }

    return (window.location.href = `/submission/results/${location}/${id}`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>Submission Steps</div>
      {submissionSteps.map((step, index) => {
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
          <Grid
            onClick={
              counter && counter > index
                ? () => goToSubmissionStep(step.link, id)
                : null
            }
            className={counter && counter > index ? classes.container : null}
            container
            key={step.id}
          >
            <Grid item xs={9}>
              <div
                className={
                  step.isActive ? classes.itemsActive : classes.itemsInactive
                }
              >
                {step.name}
              </div>
            </Grid>
            <Grid item container xs={3} justify='center' alignItems='center'>
              {counter && counter > index ? (
                <Grid item xs={12}>
                  <div className={classes.checkbox}>
                    <Checkbox checked={true} />
                  </div>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};

export default SubmissionSidebar;
