import React, { lazy, Suspense } from "react";
import {  Route, Switch } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';

const Components = ({ match }) => (
  <Suspense fallback={<Loading cover="content"/>}>
    <Switch>
      
    
      <Route path={`${match.url}/data-display`} component={lazy(() => import(`./data-display`))} />

    </Switch>
  </Suspense>
);

export default Components;