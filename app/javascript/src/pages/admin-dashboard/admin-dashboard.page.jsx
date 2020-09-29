import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import { GridContainer } from './admin-dashboard.styles';

import SecondSidebar from '../../components/shared/second-sidebar/second-sidebar.container';
import SubmissionTabs from '../../components/admin-dashboard/submission-tabs/submission-tabs.component';
import TableStarted from '../../components/admin-dashboard/table-started/table-started.container';
import TableSubmitted from '../../components/admin-dashboard/table-submitted/table-submitted.component';
import TableRevisions from '../../components/admin-dashboard/table-revisions/table-revisions.component';
import TablePublished from '../../components/admin-dashboard/table-published/table-published.component';
import CTRSidebar from '../../components/shared/ctr-sidebar/ctr-sidebar.container';
import TableInReview from '../../components/admin-dashboard/table-in-review/table-in-review.component';
import TableAccepted from '../../components/admin-dashboard/table-accepted/table-accepted.component';
import TableRejected from '../../components/admin-dashboard/table-rejected/table-rejected.component';

const AuthorDashboardPage = ({ retrieveCTRResultsStart, authToken }) => {
  const [selected, isSelected] = useState({
    started: true,
    submitted: false,
    inReview: false,
    revisions: false,
    accepted: false,
    rejected: false,
    published: false
  });

  useEffect(() => {
    if (authToken) {
      retrieveCTRResultsStart(authToken);
    }
  }, [authToken, retrieveCTRResultsStart]);

  return (
    <GridContainer container>
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
          {selected.inReview && <TableInReview />}
          {selected.revisions && <TableRevisions />}
          {selected.accepted && <TableAccepted />}
          {selected.rejected && <TableRejected />}
          {selected.published && <TablePublished />}
        </Grid>
      </Grid>
    </GridContainer>
  );
};

export default AuthorDashboardPage;
