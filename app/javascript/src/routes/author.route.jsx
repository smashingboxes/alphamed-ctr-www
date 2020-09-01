import React from 'react';

import PrivateRoute from './private.route';

import EditProfilePage from '../pages/edit-profile/edit-profile.page';
import OverviewPage from '../pages/overview/overview.page';
import AuthorDashboardPage from '../pages/author-dashboard/author-dashboard.page';
import DisclosureDashboardPage from '../pages/disclosure-dashboard/disclosure-dashboard.page';
import EmailTemplatesPage from '../pages/email-templates/email-templates.page';

const AuthorRoute = () => {
  return (
    <>
      <PrivateRoute path='/edit-profile' exact component={EditProfilePage} />
      <PrivateRoute
        path='/submission/results/new'
        exact
        component={OverviewPage}
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
