import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import SecondSidebar from '../../components/shared/second-sidebar/second-sidebar.container';
import SubmissionTabs from '../../components/author-dashboard/submission-tabs/submission-tabs.component';
import TableStarted from '../../components/author-dashboard/table-started/table-started.container';
import TableSubmitted from '../../components/author-dashboard/table-submitted/table-submitted.component';
import TableRevisions from '../../components/author-dashboard/table-revisions/table-revisions.component';
import TablePublished from '../../components/author-dashboard/table-published/table-published.component';
import CTRSidebar from '../../components/shared/ctr-sidebar/ctr-sidebar.container';

const AuthorDashboardPage = ({ retrieveCTRResultsStart, authToken }) => {
  const [selected, isSelected] = useState({
    started: true,
    submitted: false,
    revisions: false,
    published: false
  });

  useEffect(() => {
    if (authToken) {
      retrieveCTRResultsStart(authToken);
    }
  }, [authToken, retrieveCTRResultsStart]);

  return (
    <Grid container style={{ height: '75vh' }}>
      <Grid item xs={1} />
      <Grid item xs={2}>
        <Grid item container direction='column'>
          <SecondSidebar isSubmissionActive={true} />
          <CTRSidebar />
        </Grid>
      </Grid>
      <Grid item xs={9}>
        <Grid item container>
          <SubmissionTabs selected={selected} isSelected={isSelected} />
          {selected.started && <TableStarted />}
          {selected.submitted && <TableSubmitted />}
          {selected.revisions && <TableRevisions />}
          {selected.published && <TablePublished />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthorDashboardPage;
