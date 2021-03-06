import React from 'react';
import { Grid } from '@material-ui/core';

import SecondSidebar from '../../components/shared/second-sidebar/second-sidebar.container';
import TableDisclosure from '../../components/disclosure-dashboard/table-disclosure/table-disclosure.component';
import CTRSidebar from '../../components/shared/ctr-sidebar/ctr-sidebar.container';

const DisclosureFormDashboardPage = () => {
  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={2}>
        <Grid item container direction='column'>
          <SecondSidebar isFormsActive={true} />
          <CTRSidebar />
        </Grid>
      </Grid>
      <Grid item xs={9}>
        <Grid item container>
          <TableDisclosure />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DisclosureFormDashboardPage;
