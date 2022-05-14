import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PreViews from "views/pre-views";
import Loading from "components/shared-components/Loading";
import { useThemeSwitcher } from "react-css-theme-switcher";

export const AuthLayout = () => {
  const { status } = useThemeSwitcher();

  if (status === "loading") {
    return <Loading cover="page" />;
  }

  return (
    <div className="auth-container">
      <Switch>
        <Route path="" component={PreViews} />
        <Redirect from="/pre" to="/pre/create-organization" />
      </Switch>
    </div>
  );
};

export default AuthLayout;
