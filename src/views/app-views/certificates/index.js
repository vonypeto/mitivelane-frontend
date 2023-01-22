import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { AuthProvider } from "contexts/CertificateContext";

const Components = ({ match }) => (
  <AuthProvider>
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        {/* cert display list */}
        <Route
          path={`${match.url}/list`}
          component={lazy(() => import(`./cert-list`))}
        />{" "}
        <Route
          path={`${match.url}/:id`}
          component={lazy(() => import(`./cert-show`))}
        />
      </Switch>
    </Suspense>{" "}
  </AuthProvider>
);

export default React.memo(Components);
