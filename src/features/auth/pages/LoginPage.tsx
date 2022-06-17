import { Box, Button, Container, createTheme, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppDispatch } from 'app/hooks';
import * as React from 'react';
import { authActions } from '../authSlice';

export interface ILoginPageProps {}

const MyContainer = styled(Container)((theme) => ({
  display: 'flex !important',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}));

const MyPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}));

// const MyTitle = styled(Typography)(({ theme }) => ({
//   padding: theme.spacing(2),
// }));

export function LoginPage(props: ILoginPageProps) {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(
      authActions.login({
        username: '',
        password: '',
      })
    );
  };

  return (
    <MyContainer maxWidth="xs">
      <MyPaper elevation={3}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>
        <Box mt={2}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
            Fake Login
          </Button>
        </Box>
      </MyPaper>
    </MyContainer>
  );
}
