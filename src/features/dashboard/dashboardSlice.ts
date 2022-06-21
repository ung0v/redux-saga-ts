import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Student } from 'models';

export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
}

export interface RankingByCity {
  cityId: number;
  cityName: string;
  rankingList: Student[];
}

export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCityList: RankingByCity[];
}

const initialState: DashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    getData(state: DashboardState) {
      state.loading = true;
    },
    getDataSuccess(state: DashboardState) {
      state.loading = false;
    },
    getDataFailed(state: DashboardState) {
      state.loading = false;
    },
    setStatistics(state: DashboardState, action: PayloadAction<DashboardStatistics>) {
      state.statistics = action.payload;
    },
    setHighestStudentList(state: DashboardState, action: PayloadAction<Student[]>) {
      state.highestStudentList = action.payload;
    },
    setLowestStudentList(state: DashboardState, action: PayloadAction<Student[]>) {
      state.lowestStudentList = action.payload;
    },
    setRankingByCityList(state: DashboardState, action: PayloadAction<RankingByCity[]>) {
      state.rankingByCityList = action.payload;
    },
  },
});

export const dashboardAction = dashboardSlice.actions;

// selectors
export const selectLoadingDashboard = (state: RootState) => state.dashboard.loading;
export const selectStatistics = (state: RootState) => state.dashboard.statistics;
export const selectHighestStudent = (state: RootState) => state.dashboard.highestStudentList;
export const selectLowestStudent = (state: RootState) => state.dashboard.lowestStudentList;
export const selectRankingStudentByCity = (state: RootState) => state.dashboard.rankingByCityList;

const dashboardReducer = dashboardSlice.reducer;

export default dashboardReducer;
