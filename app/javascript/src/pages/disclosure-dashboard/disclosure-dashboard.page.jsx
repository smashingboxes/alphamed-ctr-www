import React from 'react';
import { Grid } from '@material-ui/core';

import SecondSidebar from '../../components/shared/second-sidebar/second-sidebar.container';
import ThirdSidebar from '../../components/shared/third-sidebar/third-sidebar.component';
import TableDisclosure from '../../components/disclosure-dashboard/table-disclosure/table-disclosure.component';

const DisclosureFormDashboardPage = () => {
  return (
    <Grid container>
      <Grid item xs={1} />
      <Grid item xs={2}>
        <Grid item container direction='column'>
          <SecondSidebar />
          <ThirdSidebar />
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Grid item container>
          <TableDisclosure />
        </Grid>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default DisclosureFormDashboardPage;
