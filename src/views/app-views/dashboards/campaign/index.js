import React from 'react'
import Campaigns from './Campaigns'
import UserCampaign from './UserCampaign'
import { BrowserRouter, Switch, Route, useLocation} from "react-router-dom";

const Index = () => {
	const location = useLocation()
	// console.log(location.pathname)

	return (
		<>
			<BrowserRouter>
				<Switch>
					<Route path={`${location.pathname}`} component={Campaigns} exact></Route>
					<Route path={`${location.pathname}/:id`} component={UserCampaign} exact></Route>
				</Switch>
			</BrowserRouter>
		</>
	)
}

export default Index
