import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { GlobalStyle } from './global.styles';

import { selectCurrentUser } from './redux/user/user.selectors';

import Navbar from './components/shared/navbar/navbar.container';
import Footer from './components/shared/footer/footer.component';
import SubNavbar from './components/shared/sub-navbar/sub-navbar.container';

import SignInPage from './pages/sign-in/sign-in.page';
import SignUpPage from './pages/sign-up/sign-up.page';
import EditProfilePage from './pages/edit-profile/edit-profile.page';
import ForgotPasswordPage from './pages/forgot-password/forgot-password.page';
import ClinicalTrialResultsPage from './pages/clinical-trial-results/clinical-trial-results.page';
import AuthorDashboardPage from './pages/author-dashboard/author-dashboard.page';
import SectionEditorDashboardPage from './pages/section-editor-dashboard/section-editor-dashboard.page';
import AdminDashboardPage from './pages/admin-dashboard/admin-dashboard.page';
import DisclosureFormDashboardPage from './pages/disclosure-dashboard/disclosure-dashboard.page';
import DisclosureForm from './components/disclosure-dashboard/disclosure-form/disclosure-form.component';
import OverviewPage from './pages/overview/overview.page';
import { createStructuredSelector } from 'reselect';

const App = ({ history, user }) => {
  const { pathname } = history.location;
  const excludedLinks = [
    '/sign-in',
    '/sign-up',
    '/edit-profile',
    '/visiting/results',
    '/forgot-password',
    '/disclosure-form'
  ];

  return (
    <div>
      <GlobalStyle />
      <Navbar />
      {excludedLinks.includes(pathname) ? null : <SubNavbar />}
      <Switch>
        <Redirect exact from='/' to='/visiting/results' />
        <Route path='/sign-in' exact component={SignInPage} />
        <Route path='/sign-up' exact component={SignUpPage} />
        <Route path='/edit-profile' exact component={EditProfilePage} />
        <Route path='/forgot-password' exact component={ForgotPasswordPage} />
        <Route
          path='/visiting/results'
          exact
          component={ClinicalTrialResultsPage}
        />
        <Route path='/my-forms' exact component={DisclosureFormDashboardPage} />
        <Route path='/disclosure-form' exact component={DisclosureForm} />
        <Route path='/submission/results/new' exact component={OverviewPage} />
        <Route
          path='/submission/admin/results'
          exact
          component={AdminDashboardPage}
        />
        <Route
          path='/submission/se/results'
          exact
          component={SectionEditorDashboardPage}
        />
        <Route
          path='/submission/author/results'
          exact
          component={AuthorDashboardPage}
        />
      </Switch>
      <Footer />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser
});

export default withRouter(connect(mapStateToProps)(App));
