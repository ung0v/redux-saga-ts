import * as React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';

export interface IPrivateRouteProps {}

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = !!localStorage.getItem('access_token');

  if (!isLoggedIn) return <Navigate to="/login" />;

  return children;
}
