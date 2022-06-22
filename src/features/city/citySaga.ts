import cityApi from 'api/cityApi';
import { City, ListResponse } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { cityActions } from './citySlice';

function* getCityList() {
  try {
    const response: ListResponse<City> = yield call(cityApi.getAll);
    yield put(cityActions.getCityListSuccess(response));
  } catch (error) {
    console.log('failed to get city', error);
    yield put(cityActions.getCityListFailed());
  }
}

export default function* citySaga() {
  yield takeLatest(cityActions.getCityList.type, getCityList);
}
