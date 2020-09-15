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
