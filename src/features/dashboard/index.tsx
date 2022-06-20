import * as React from 'react';
import { Outlet } from 'react-router-dom';

export interface DashboardProps {}

export default function Dashboard(props: DashboardProps) {
  return (
    <div>
      Dashboard
      {/* <Outlet /> */}
    </div>
  );
}
