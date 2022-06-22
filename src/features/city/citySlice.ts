import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City, ListResponse } from 'models';

export interface CityState {
  loading: boolean;
  list: City[];
}

const initialState: CityState = {
  loading: false,
  list: [],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    getCityList(state: CityState) {
      state.loading = true;
    },
    getCityListSuccess(state: CityState, action: PayloadAction<ListResponse<City>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    getCityListFailed(state: CityState) {
      state.loading = false;
    },
  },
});

export const cityActions = citySlice.actions;

export const selectCityList = (state: RootState) => state.city.list;
export const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city;
    return map;
  }, {})
);

const cityReducer = citySlice.reducer;

export default cityReducer;
