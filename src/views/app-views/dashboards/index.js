import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { useParams } from "react-router-dom";
import Home from "./home";
import Campaign from "./campaign";

const Dashboards = ({ match }) => {
  let { barangay_id } = useParams();
  // console.log(barangay_id);
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${match.url}/home`}
          component={() => <Home param_url={barangay_id} />}
        />
        <Route
          path={`${match.url}/campaign`}
          component={() => <Campaign param_url={barangay_id} />}
        />

        {/* <Route path={`${match.url}/default`} component={lazy(() => import(`./default`))} />
      <Route path={`${match.url}/analytic`} component={lazy(() => import(`./analytic`))} />
      <Route path={`${match.url}/sales`} component={lazy(() => import(`./sales`))} /> */}
        <Redirect from={`${match.url}`} to={`${match.url}/home`} />
      </Switch>
    </Suspense>
  );
};

export default Dashboards;
