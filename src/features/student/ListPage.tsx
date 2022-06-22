import { Box, Button, Pagination, Typography } from '@mui/material';
import studentApi from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { Loading } from 'features/dashboard';
import { ListParams, Student } from 'models';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentFilters from './components/StudentFilters';
import StudentTable from './components/StudentTable';
import {
  selectStudentFilter,
  selectStudentList,
  selectStudentLoading,
  selectStudentPagination,
} from './studentSlice';

import { studentActions } from './studentSlice';

export interface ListPageProps {}

export default function ListPage(props: ListPageProps) {
  const dispatch = useAppDispatch();
  const students = useAppSelector(selectStudentList);
  const loading = useAppSelector(selectStudentLoading);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  useEffect(() => {
    dispatch(studentActions.getStudentList(filter));
  }, [dispatch, filter]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudent = async (
    student: Student,
    callback?: { [key: string]: () => void }
  ) => {
    console.log('student remove', student);
    try {
      await studentApi.remove(student.id as string);

      dispatch(studentActions.getStudentList(filter));
      callback?.closeDialog();
    } catch (error) {
      console.log('failed to fetch student', error);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      {loading && (
        <Box mt={2}>
          <Loading />
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">Students</Typography>
        <Link
          to="add"
          style={{
            textDecoration: 'none',
          }}
        >
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>

      <Box mt={1} mb={2}>
        <StudentFilters
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
        />
      </Box>

      <Box mt={3}>
        <StudentTable studentList={students} cityMap={cityMap} onRemove={handleRemoveStudent} />
      </Box>
      <Box
        mt={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Pagination
          color="primary"
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          page={filter._page}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
}
