import React from "react";
import { Route, Redirect } from "react-router-dom";
import LoggedIn from "./LoggedIn";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      LoggedIn ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default PrivateRoute;
