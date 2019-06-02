import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

const AuthenticatedRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === "true" ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default AuthenticatedRoute;
