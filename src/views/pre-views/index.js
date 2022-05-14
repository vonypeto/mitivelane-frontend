import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { PRE_PREFIX_PATH } from "configs/AppConfig";

export const PreViews = () => {
  return (
    <Suspense fallback={<Loading cover="page" />}>
      <Switch>
        <Route
          path={`${PRE_PREFIX_PATH}/create-organization`}
          component={lazy(() => import(`./organization-register`))}
        />{" "}
        <Route
          path={`${PRE_PREFIX_PATH}/help-center`}
          component={lazy(() => import(`./help-center`))}
        />
        {/* <Route
          path={`${PRE_PREFIX_PATH}/test`}
          component={lazy(() => import(`./test`))}
        /> */}
        <Redirect
          from={`${PRE_PREFIX_PATH}`}
          to={`${PRE_PREFIX_PATH}/create-organization`}
        />
      </Switch>
    </Suspense>
  );
};

export default PreViews;
