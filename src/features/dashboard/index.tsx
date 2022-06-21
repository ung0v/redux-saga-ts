import { PeopleAlt } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  createTheme,
  Grid,
  LinearProgress,
  styled,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import StatisticItem from './components/StatisticItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import {
  dashboardAction,
  selectHighestStudent,
  selectLoadingDashboard,
  selectLowestStudent,
  selectRankingStudentByCity,
  selectStatistics,
} from './dashboardSlice';

export interface DashboardProps {}

const Loading = styled(LinearProgress)(({ theme }) => ({
  display: 'absolute',
  top: theme.spacing(-2),
  width: '100%',
}));
const theme = createTheme();

export default function Dashboard(props: DashboardProps) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoadingDashboard);
  const statistics = useAppSelector(selectStatistics);
  const highestStudentList = useAppSelector(selectHighestStudent);
  const lowestStudentList = useAppSelector(selectLowestStudent);
  const rankingByCityList = useAppSelector(selectRankingStudentByCity);

  useEffect(() => {
    dispatch(dashboardAction.getData());
  }, [dispatch]);

  return (
    <Box
      sx={{
        position: 'relative',
        paddingTop: theme.spacing(2),
      }}
    >
      {loading && <Loading />}
      {/* <Loading /> */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="male"
            value={statistics.maleCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="female"
            value={statistics.femaleCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="mark >= 8"
            value={statistics.highMarkCount}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4} xl={3}>
          <StatisticItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            label="mark <= 5"
            value={statistics.lowMarkCount}
          />
        </Grid>
      </Grid>

      <Box mt={5}>
        <Typography variant="h5">All Students</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with highest mark">
                <StudentRankingList studentList={highestStudentList} />
              </Widget>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with lowset mark">
                <StudentRankingList studentList={lowestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box mt={5}>
        <Typography variant="h5">Ranking by city</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCityList.map((ranking) => (
              <Grid key={ranking.cityId} item xs={12} md={6} lg={3}>
                <Widget title={`TP. ${ranking.cityName}`}>
                  <StudentRankingList studentList={ranking.rankingList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
