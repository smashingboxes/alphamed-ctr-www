import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import SecondSidebar from '../../components/shared/second-sidebar/second-sidebar.container';
import ThirdSidebar from '../../components/shared/third-sidebar/third-sidebar.component';
import SubmissionTabs from '../../components/section-editor-dashboard/submission-tabs/submission-tabs.component';
import TableOriginalSubmissions from '../../components/section-editor-dashboard/table-original-submissions/table-original-submissions.component';
import TableRevisions from '../../components/section-editor-dashboard/table-revisions/table-revisions.component';
import TablePublished from '../../components/section-editor-dashboard/table-published/table-published.component';

const SectionEditorDashboardPage = () => {
  const [selected, isSelected] = useState({
    originalSubmissions: true,
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
          {selected.originalSubmissions && <TableOriginalSubmissions />}
          {selected.revisions && <TableRevisions />}
          {selected.published && <TablePublished />}
        </Grid>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default SectionEditorDashboardPage;
