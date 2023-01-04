import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { useParams } from "react-router-dom";
import Home from "./home";
import Campaign from "./campaign";
// import Chat from "./chat";

const Dashboards = ({ match }) => {
  let { organization_id } = useParams();
  // console.log(organization_id);
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${match.url}/home`}
          component={() => <Home param_url={organization_id} />}
        />
        <Route
          path={`${match.url}/campaign`}
          component={() => <Campaign param_url={organization_id} />}
        />
        {/* <Route
          path={`${match.url}/chat`}
          component={() => <Chat param_url={organization_id} />}
        /> */}

        {/* <Route path={`${match.url}/default`} component={lazy(() => import(`./default`))} />
      <Route path={`${match.url}/analytic`} component={lazy(() => import(`./analytic`))} />
      <Route path={`${match.url}/sales`} component={lazy(() => import(`./sales`))} /> */}
        <Redirect from={`${match.url}`} to={`${match.url}/home`} />
      </Switch>
    </Suspense>
  );
};

export default Dashboards;
