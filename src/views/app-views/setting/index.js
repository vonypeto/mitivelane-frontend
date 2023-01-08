import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Default from "./default";
import Billing from "./billing";
import Audit from "./audit";
import TeamManage from "./team/manage-team";
// import TeamCreate from "./team/create-team";

import { useParams } from "react-router-dom";

const Resident = (props) => {
  const { match } = props;
  let { organization_id } = useParams();

  return (
    <Switch>
      <Route
        path={`${match.url}/audit`}
        component={() => <Audit param_url={organization_id} />}
      />
      {/* <Route
        path={`${match.url}/billing`}
        component={() => <Billing param_url={organization_id} />}
      /> */}
      <Route
        path={`${match.url}/team-manage`}
        component={() => <TeamManage param_url={organization_id} />}
      />
      {/* <Route
        path={`${match.url}/team-create`}
        component={() => <TeamCreate param_url={organization_id} />}
      /> */}

      <Redirect exact from={`${match.url}`} to={`${match.url}/team-manage`} />
    </Switch>
  );
};

export default Resident;
