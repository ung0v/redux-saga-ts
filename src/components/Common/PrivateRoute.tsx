import * as React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';

export interface IPrivateRouteProps {}

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = !!localStorage.getItem('access_token');
  console.log('is logged in', isLoggedIn);

  if (!isLoggedIn) return <Navigate to="/login" />;

  return children;
}
