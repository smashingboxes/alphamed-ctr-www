import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import SecondSidebar from '../../components/shared/second-sidebar/second-sidebar.container';
import ThirdSidebar from '../../components/shared/third-sidebar/third-sidebar.component';
import SubmissionTabs from '../../components/author-dashboard/submission-tabs/submission-tabs.component';
import TableStarted from '../../components/author-dashboard/table-started/table-started.component';
import TableSubmitted from '../../components/author-dashboard/table-submitted/table-submitted.component';
import TableRevisions from '../../components/author-dashboard/table-revisions/table-revisions.component';
import TablePublished from '../../components/author-dashboard/table-published/table-published.component';

const AuthorDashboardPage = () => {
  const [selected, isSelected] = useState({
    started: true,
    submitted: false,
    revisions: false,
    published: false
  });

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
          <SubmissionTabs selected={selected} isSelected={isSelected} />
          {selected.started && <TableStarted />}
          {selected.submitted && <TableSubmitted />}
          {selected.revisions && <TableRevisions />}
          {selected.published && <TablePublished />}
        </Grid>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default AuthorDashboardPage;
