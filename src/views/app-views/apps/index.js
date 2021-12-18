import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';

const Apps = ({ match }) => (
  <Suspense fallback={<Loading cover="content"/>}>
    <Switch>
      <Route path={`${match.url}/mail`} component={lazy(() => import(`./mail`))} />
     
      <Route path={`${match.url}/ecommerce`} component={lazy(() => import(`./e-commerce`))} />
      <Redirect from={`${match.url}`} to={`${match.url}/mail`} />
    </Switch>
  </Suspense>
);

export default Apps;