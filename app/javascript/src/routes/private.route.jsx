import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectIsAuthenticated } from '../redux/user/user.selectors';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return <Redirect to='/sign-in' />;
        }
      }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
