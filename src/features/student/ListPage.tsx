import { Box, Button, Typography } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { useEffect } from 'react';

import { studentActions } from './studentSlice';

export interface ListPageProps {}

export default function ListPage(props: ListPageProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      studentActions.getStudentList({
        _page: 1,
        _limit: 5,
      })
    );
  }, [dispatch]);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" color="primary">
          Add new student
        </Button>
      </Box>
    </Box>
  );
}
