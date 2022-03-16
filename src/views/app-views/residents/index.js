import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import Information from './information/list-information'
import AddInformation from './information/add-information'
import ViewInformation from './information/view-information'
import EditInformation from './information/edit-information'
import Household from './household/fundlist'
import Archive from './household/Archive';

import { useParams } from "react-router-dom";



const Resident = props => {
  const { match } = props
  let { barangay_id } = useParams();
  console.log("First Loop: " + barangay_id )
  
	return (
		<Switch>
			<Route path={`${match.url}/resident-information/list`} component={() => <Information param_url={barangay_id} />}  />
			<Route path={`${match.url}/resident-information/add`} component={() => <AddInformation param_url={barangay_id} />} />
			<Route path={`${match.url}/resident-information/:id/view`} component={() => <ViewInformation  {...props}/> }/>
			<Route path={`${match.url}/resident-information/:id/edit`} component={() => <EditInformation  {...props}/> }/>
			<Route path={`${match.url}/household/list`} component={() => <Household param_url={barangay_id} />}  />
			<Route path={`${match.url}/household/archive`} component={() => <Archive barangay_id={barangay_id} />}  />

			<Redirect exact from={`${match.url}`} to={`${match.url}/resident-information/list`} />

		</Switch>
	)
}

export default Resident

