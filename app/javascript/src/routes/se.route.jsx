import React from 'react';

import PrivateRoute from './private.route';

import EditProfilePage from '../pages/edit-profile/edit-profile.page';
import SectionEditorDashboardPage from '../pages/section-editor-dashboard/section-editor-dashboard.page';

const SERoute = () => {
  return (
    <>
      <PrivateRoute path='/edit-profile' exact component={EditProfilePage} />
      <PrivateRoute
        path='/submission/se/results'
        exact
        component={SectionEditorDashboardPage}
      />
    </>
  );
};

export default SERoute;
