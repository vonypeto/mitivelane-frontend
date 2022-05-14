import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Spin from "components/shared-components/Loading";
import { APP_PREFIX_PATH, PRE_PREFIX_PATH } from "configs/AppConfig";
import { useAuth } from "../../contexts/AuthContext";

export const AppViews = () => {
  const { currentOrganization } = useAuth();
  return (
    <Suspense fallback={<Spin cover="content" />}>
      <Switch>
        <Route
          path={`${APP_PREFIX_PATH}/:organization_id/dashboards`}
          component={lazy(() => import(`./dashboards`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/:organization_id/residents`}
          component={lazy(() => import(`./residents`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/:organization_id/records`}
          component={lazy(() => import(`./records`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/:organization_id/setting`}
          component={lazy(() => import(`./setting`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/:organization_id/apps`}
          component={lazy(() => import(`./apps`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/:organization_id/components`}
          component={lazy(() => import(`./components`))}
        />{" "}
        <Route
          path={`${APP_PREFIX_PATH}/:organization_id/cert-display`}
          component={lazy(() => import(`./certificates`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/user/profile`}
          component={lazy(() => import(`./accounts`))}
        />
        {/* Redirect From Login to other part of the auth process */}
        <Redirect
          from={`${APP_PREFIX_PATH}`}
          to={`${APP_PREFIX_PATH}/` + currentOrganization + `/dashboards/home`}
        />
        {/* {currentOrganization == null ? (
          <Redirect
            from={`${APP_PREFIX_PATH}`}
            to={`${PRE_PREFIX_PATH}/create-organization/`}
          />
        ) : (
          <Redirect
            from={`${APP_PREFIX_PATH}`}
            to={`${APP_PREFIX_PATH}/organization/`}
          />
        )} */}
      </Switch>
    </Suspense>
  );
};

export default React.memo(AppViews);
