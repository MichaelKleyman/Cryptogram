import React from 'react';
import Home from './Home';
import { useRoutes } from 'react-router-dom';
import Coin from './Coin';

const Routes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/:id', element: <Coin /> },
  ]);

  return routes;
};

export default Routes;
