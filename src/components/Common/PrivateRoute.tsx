import * as React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';

export interface IPrivateRouteProps {
  
}

export function PrivateRoute(props: RouteProps) {
  const isLoggedIn = !!localStorage.getItem('access_token');
  if (!isLoggedIn) return <Navigate to="/login" />;

  return <Route {...props}>Private Route</Route>;
}
