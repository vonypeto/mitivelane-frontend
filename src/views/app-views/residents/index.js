import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Information from "./information/list-information";
import AddInformation from "./information/add-information";
import ViewInformation from "./information/view-information";
import EditInformation from "./information/edit-information";
import Household from "./household/HouseholdList";
import Archive from "./household/Archive";
import SupplyDistribution from "./household/SupplyDistribution";
import PurokArea from "./household/PurokArea";
import ManageHousehold from "./household/ManageHousehold";

import { useParams } from "react-router-dom";

const Resident = (props) => {
  const { match } = props;
  let { organization_id } = useParams();

  return (
    <Switch>
      <Route
        path={`${match.url}/resident-information/list`}
        component={() => <Information param_url={organization_id} />}
      />
      <Route
        path={`${match.url}/resident-information/add`}
        component={() => <AddInformation param_url={organization_id} />}
      />
      <Route
        path={`${match.url}/resident-information/:id/view`}
        component={() => <ViewInformation {...props} />}
      />
      <Route
        path={`${match.url}/resident-information/:id/edit`}
        component={() => <EditInformation {...props} />}
      />
      <Route
        path={`${match.url}/household/list`}
        component={() => <Household param_url={organization_id} />}
      />
      {/* <Route
        path={`${match.url}/household/archive`}
        component={() => <Archive organization_id={organization_id} />}
      /> */}
      <Route
        path={`${match.url}/household/purok`}
        component={() => <PurokArea organization_id={organization_id} />}
      />
      <Route
        path={`${match.url}/household/supply`}
        component={() => (
          <SupplyDistribution organization_id={organization_id} />
        )}
      />

      <Route
        path={`${match.url}/household/add`}
        component={() => (
          <ManageHousehold organization_id={organization_id} mode="ADD" />
        )}
      />
      <Route
        path={`${match.url}/household/:household_id/edit`}
        component={() => (
          <ManageHousehold organization_id={organization_id} mode="EDIT" />
        )}
      />

      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/resident-information/list`}
      />
    </Switch>
  );
};

export default Resident;
