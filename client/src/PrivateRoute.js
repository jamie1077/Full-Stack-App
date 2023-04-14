import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Consumer } from './Context';

export default function PrivateRoutes() {
  const location = useLocation();
  return (
    <Consumer>
      {(context) =>
        context.authenticatedUser ? (
          <Outlet />
        ) : (
          <Navigate
            to={'/signin'}
            state={{ from: location.pathname }}
          />
        )
      }
    </Consumer>
  );
}