import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { GlobalStyle } from './global.styles';

import {
  selectCurrentUser,
  selectIsAuthenticated
} from './redux/user/user.selectors';

import AuthorRoute from './routes/author.route';
import AdminRoute from './routes/admin.route';
import SERoute from './routes/se.route';

import Navbar from './components/shared/navbar/navbar.container';
import Footer from './components/shared/footer/footer.component';
import SubNavbar from './components/shared/sub-navbar/sub-navbar.container';

import SignInPage from './pages/sign-in/sign-in.page';
import SignUpPage from './pages/sign-up/sign-up.page';
import ForgotPasswordPage from './pages/forgot-password/forgot-password.page';
import ClinicalTrialResultsPage from './pages/clinical-trial-results/clinical-trial-results.page';
import EmailTemplateFormPage from './pages/email-template-form/email-template-form.page';

const App = ({ history, user, isAuthenticated }) => {
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
        <Route
          path='/sign-in'
          exact
          render={() =>
            isAuthenticated ? <Redirect to='/' /> : <SignInPage />
          }
        />
        <Route
          path='/sign-up'
          exact
          render={() =>
            isAuthenticated ? <Redirect to='/' /> : <SignUpPage />
          }
        />
        <Route
          path='/forgot-password'
          exact
          render={() =>
            isAuthenticated ? <Redirect to='/' /> : <ForgotPasswordPage />
          }
        />
        <Route
          path='/visiting/results'
          exact
          component={ClinicalTrialResultsPage}
        />
        <Route path='/email-form' exact component={EmailTemplateFormPage} />
        {!isAuthenticated ? null : !user ? null : user.user_type === 3 ? (
          <AuthorRoute />
        ) : null}
        {!isAuthenticated ? null : !user ? null : user.user_type === 1 ? (
          <AdminRoute />
        ) : null}
        {!isAuthenticated ? null : !user ? null : user.user_type === 2 ? (
          <SERoute />
        ) : null}
      </Switch>
      <Footer />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  isAuthenticated: selectIsAuthenticated
});

export default withRouter(connect(mapStateToProps)(App));
