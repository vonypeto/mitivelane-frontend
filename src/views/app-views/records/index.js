import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import BlotterList from "./blotter/blotter-list";
import BlotterAdd from "./blotter/blotter-add";
import BlotterEdit from "./blotter/blotter-edit";
import BlotterForm from "./blotter/blotter-add";
import SettlementCase from "./settlement";
import BlotterRequestForm from "./blotter/blotter-request-form";

import { useParams } from "react-router-dom";

const Resident = (props) => {
  const { match } = props;
  let { barangay_id } = useParams();

  return (
    <Switch>
      <Route
        path={`${match.url}/blotter-record/list`}
        component={() => <BlotterList param_url={barangay_id} />}
      />
      <Route
        path={`${match.url}/blotter-record/add`}
        component={() => <BlotterAdd param_url={barangay_id} />}
      />
      <Route
        path={`${match.url}/blotter-record/:id/edit`}
        component={() => <BlotterEdit param_url={barangay_id} />}
      />
      <Route
        path={`${match.url}/blotter-request-form/add`}
        component={() => <BlotterRequestForm param_url={barangay_id} />}
      />
      <Route
        path={`${match.url}/settlement`}
        component={() => <SettlementCase param_url={barangay_id} />}
      />

      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/blotter-record/list`}
      />
    </Switch>
  );
};

export default Resident;
