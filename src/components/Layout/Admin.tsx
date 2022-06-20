import { Box } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Header from 'components/Common/Header';
import SideBar from 'components/Common/SideBar';
import { Outlet, Route, Routes } from 'react-router-dom';
import Dashboard from 'features/dashboard';
import Student from 'features/student';

const Root = styled(Box)(() => ({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gridTemplateColumns: '250px 1fr',
  gridTemplateAreas: '"header header" "sidebar main"',
  minHeight: '100vh',
}));

const AdminHeader = styled(Box)(({ theme }) => ({
  gridArea: 'header',
}));

const AdminSideBar = styled(Box)(({ theme }) => ({
  gridArea: 'sidebar',
  borderRight: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));
const AdminMain = styled(Box)(({ theme }) => ({
  gridArea: 'main',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2, 3),
}));

export function AdminLayout() {
  return (
    <Root>
      <AdminHeader>
        <Header />
      </AdminHeader>
      <AdminSideBar>
        <SideBar />
      </AdminSideBar>
      <AdminMain>
        <Outlet />
      </AdminMain>
    </Root>
  );
}
