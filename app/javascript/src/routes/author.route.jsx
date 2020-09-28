import React from 'react';
import PrivateRoute from './private.route';

import EditProfilePage from '../pages/edit-profile/edit-profile.page';
import OverviewPage from '../pages/overview/overview.container';
import AuthorDashboardPage from '../pages/author-dashboard/author-dashboard.container';
import DisclosureDashboardPage from '../pages/disclosure-dashboard/disclosure-dashboard.page';
import EmailTemplatesPage from '../pages/email-templates/email-templates.page';
import YourInformationPage from '../pages/your-information/your-information.container';
import CoAuthorInformationPage from '../pages/co-author-information/co-author-information.container';
import AuthorSummaryAbstractPage from '../pages/author-summary-abstract/author-summary-abstract.container';
import TrailInformationPage from '../pages/trial-information/trial-information.container';
import AuthorDrugInformationPage from '../pages/author-drug-information/author-drug-information.container';
import AuthorPatientCharPage from '../pages/author-patient-char/author-patient-char.page';
import AuthorPrimaryAssessmentPage from '../pages/author-primary-assessment/author-primary-assessment.container';
import AuthorAdverseEventPage from '../pages/author-adverse-event/author-adverse-event.container';
import AuthorPharmaPagePage from '../pages/author-pharma/author-pharma.container';
import AuthorAssessmentDiscussionPage from '../pages/author-assessment-discussion/author-assessment-discussion.container';
import AuthorFigureTablePage from '../pages/author-figure-table/author-figure-table.container';
import AuthorFormsPage from '../pages/author-forms/author-forms.container';
import AuthorSubmissionOverviewPage from '../pages/author-submission-overview/author-submission-overview.container';

const AuthorRoute = () => {
  return (
    <>
      <PrivateRoute path='/edit-profile' exact component={EditProfilePage} />
      <PrivateRoute
        path='/submission/results/:id'
        exact
        component={OverviewPage}
      />
      <PrivateRoute
        path='/submission/results/your-information/:id'
        exact
        component={YourInformationPage}
      />
      <PrivateRoute
        path='/submission/results/co-author-information/:id'
        exact
        component={CoAuthorInformationPage}
      />
      <PrivateRoute
        path='/submission/results/author-summary-abstract/:id'
        exact
        component={AuthorSummaryAbstractPage}
      />
      <PrivateRoute
        path='/submission/results/trial-information/:id'
        exact
        component={TrailInformationPage}
      />
      <PrivateRoute
        path='/submission/results/drug-information/:id'
        exact
        component={AuthorDrugInformationPage}
      />
      <PrivateRoute
        path='/submission/results/patient-char/:id'
        exact
        component={AuthorPatientCharPage}
      />
      <PrivateRoute
        path='/submission/results/primary-assessment-method/:id'
        exact
        component={AuthorPrimaryAssessmentPage}
      />
      <PrivateRoute
        path='/submission/results/adverse-event/:id'
        exact
        component={AuthorAdverseEventPage}
      />
      <PrivateRoute
        path='/submission/results/pharma/:id'
        exact
        component={AuthorPharmaPagePage}
      />
      <PrivateRoute
        path='/submission/results/assessment-discussion/:id'
        exact
        component={AuthorAssessmentDiscussionPage}
      />
      <PrivateRoute
        path='/submission/results/figure-table/:id'
        exact
        component={AuthorFigureTablePage}
      />
      <PrivateRoute
        path='/submission/results/author-forms/:id'
        exact
        component={AuthorFormsPage}
      />
      <PrivateRoute
        path='/submission/results/submission-overview/:id'
        exact
        component={AuthorSubmissionOverviewPage}
      />
      <PrivateRoute
        path='/submission/author/results'
        exact
        component={AuthorDashboardPage}
      />
      <PrivateRoute
        path='/my-forms'
        exact
        component={DisclosureDashboardPage}
      />
      <PrivateRoute
        path='/email-templates'
        exact
        component={EmailTemplatesPage}
      />
    </>
  );
};

export default AuthorRoute;
