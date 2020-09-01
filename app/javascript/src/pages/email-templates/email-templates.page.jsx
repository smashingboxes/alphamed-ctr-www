import React from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';

import { useStyles } from './email-templates.styles';

import SecondSidebar from '../../components/shared/second-sidebar/second-sidebar.container';
import EmailTable from '../../components/email-templates/email-table/email-table.component';
import CTRSidebar from '../../components/shared/ctr-sidebar/ctr-sidebar.container';
import PrimaryButton from '../../components/shared/primary-button/primary-button.component';

const EmailTemplatesPage = ({ history }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={2}>
        <Grid item container direction='column'>
          <SecondSidebar />
          <CTRSidebar />
        </Grid>
      </Grid>
      <Grid item xs={9}>
        <Grid item container>
          <Typography className={classes.title} variant='h4' color='primary'>
            Email Templates
          </Typography>
          <EmailTable />
          <Grid
            className={classes.buttonContainer}
            item
            container
            justify='flex-end'
            alignItems='center'
          >
            <PrimaryButton onClick={() => history.push('/email-form')}>
              New Template
            </PrimaryButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withRouter(EmailTemplatesPage);
