import cityApi from 'api/cityApi';
import studentApi from 'api/studentApi';
import { City, ListResponse, Student } from 'models';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { dashboardAction, RankingByCity } from './dashboardSlice';

function* getStatistics() {
  const responseList: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 5, gender: 'male' }),
    call(studentApi.getAll, { _page: 1, _limit: 5, gender: 'female' }),
    call(studentApi.getAll, { _page: 1, _limit: 5, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 5, mark_lte: 5 }),
  ]);
  const statisticsList = responseList.map((x) => x.pagination._totalRows);
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticsList;
  yield put(dashboardAction.setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount }));
}
function* getHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });

  yield put(dashboardAction.setHighestStudentList(data));
}
function* getLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });

  yield put(dashboardAction.setLowestStudentList(data));
}
function* getRankingByCityList() {
  // get city list
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);

  //get ranking per city
  const callList = cityList.map((x) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'asc',
      city: x.code,
    })
  );

  const responseList: Array<ListResponse<Student>> = yield all(callList);
  const rankingByCityList: Array<RankingByCity> = responseList.map((x, idx) => ({
    cityId: cityList[idx].code,
    cityName: cityList[idx].name,
    rankingList: x.data,
  }));

  //update state
  yield put(dashboardAction.setRankingByCityList(rankingByCityList));
}

function* getDashboardData() {
  try {
    yield all([
      call(getStatistics),
      call(getHighestStudentList),
      call(getLowestStudentList),
      call(getRankingByCityList),
    ]);

    yield put(dashboardAction.getDataSuccess());
  } catch (error) {
    console.log('error get dashboard data', error);
    yield put(dashboardAction.getDataFailed());
  }
}

export function* dashboardSaga() {
  yield takeLatest(dashboardAction.getData.type, getDashboardData);
}
