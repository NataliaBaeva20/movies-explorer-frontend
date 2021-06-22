import React from "react";
import { Route, Redirect } from "react-router-dom";

// компонент ProtectedRoute принимает другой компонент в качестве пропса
const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.loggedIn ? <Component {...props} /> : <Redirect to="/signin" />
      }
    </Route>
  );
};

export default ProtectedRoute;
