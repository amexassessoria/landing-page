import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Principal from '../pages/Principal';
const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Principal} />

  </Switch>
);

export default Routes;
