import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import SecondSidebar from '../../components/shared/second-sidebar/second-sidebar.container';
import SubmissionTabs from '../../components/admin-dashboard/submission-tabs/submission-tabs.component';
import TableStarted from '../../components/admin-dashboard/table-started/table-started.component';
import TableSubmitted from '../../components/admin-dashboard/table-submitted/table-submitted.component';
import TableInReview from '../../components/admin-dashboard/table-in-review/table-in-review.component';
import TableRevisions from '../../components/admin-dashboard/table-revisions/table-revisions.component';
import TableAccepted from '../../components/admin-dashboard/table-accepted/table-accepted.component';
import TableRejected from '../../components/admin-dashboard/table-rejected/table-rejected.component';
import TablePublished from '../../components/admin-dashboard/table-published/table-published.component';

const AdminDashboardPage = () => {
  const [selected, isSelected] = useState({
    started: true,
    submitted: false,
    inReview: false,
    revisions: false,
    accepted: false,
    rejected: false,
    published: false
  });

  return (
    <Grid container style={{ height: '75vh' }}>
      <Grid item xs={1} />
      <Grid item xs={2}>
        <Grid item container direction='column'>
          <SecondSidebar />
        </Grid>
      </Grid>
      <Grid item xs={9}>
        <Grid item container>
          <SubmissionTabs selected={selected} isSelected={isSelected} />
          {selected.started && <TableStarted />}
          {selected.submitted && <TableSubmitted />}
          {selected.inReview && <TableInReview />}
          {selected.revisions && <TableRevisions />}
          {selected.accepted && <TableAccepted />}
          {selected.rejected && <TableRejected />}
          {selected.published && <TablePublished />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminDashboardPage;
