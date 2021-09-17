import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated
          ? <Component {...props} {...rest} />
          : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
