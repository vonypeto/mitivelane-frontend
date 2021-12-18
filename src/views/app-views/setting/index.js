import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Default from './default'
import Billing from './billing'
import Audit from './audit'
import TeamManage from './team/manage-team'
import TeamCreate from './team/create-team'

import { useParams } from "react-router-dom";


const Resident = props => {
  const { match } = props
  let { barangay_id } = useParams();
  console.log("First Loop: "+barangay_id )
  
	return (
		<Switch>
			<Route path={`${match.url}/default`} component={() => <Default param_url={barangay_id} />}  />
			<Route path={`${match.url}/audit`} component={() => <Audit param_url={barangay_id} />}  />
			<Route path={`${match.url}/billing`} component={() => <Billing param_url={barangay_id} />}  />
			<Route path={`${match.url}/team-manage`} component={() => <TeamManage param_url={barangay_id} />}  />
			<Route path={`${match.url}/team-create`} component={() => <TeamCreate param_url={barangay_id} />}  />

			<Redirect exact from={`${match.url}`} to={`${match.url}/default`} />

		</Switch>
	)
}

export default Resident

