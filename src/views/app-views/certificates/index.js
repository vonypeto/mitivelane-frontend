import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";

const Components = ({ match }) => (
  <Suspense fallback={<Loading cover="content" />}>
    <Switch>
      <Route
        path={`${match.url}/list`}
        component={lazy(() => import(`./cert-display`))}
      />{" "}
      <Route
        path={`${match.url}/create`}
        component={lazy(() => import(`./cert-manage`))}
      />
    </Switch>
  </Suspense>
);

export default Components;
