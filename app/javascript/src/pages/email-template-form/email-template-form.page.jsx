import React from 'react';
import { Grid } from '@material-ui/core';

import SecondSidebar from '../../components/shared/second-sidebar/second-sidebar.container';
import CTRSidebar from '../../components/shared/ctr-sidebar/ctr-sidebar.container';
import EmailForm from '../../components/email-template-form/email-form/email-form.container';

const EmailTemplateFormPage = () => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <Grid item container direction='column'>
          <SecondSidebar isEmailTemplatesActive={true} />
          <CTRSidebar />
        </Grid>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={7}>
        <Grid item container>
          <EmailForm />
        </Grid>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default EmailTemplateFormPage;
