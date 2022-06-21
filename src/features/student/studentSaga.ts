import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/studentApi';
import { ListParams, ListResponse, Student } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { studentActions } from './studentSlice';

function* getStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.getStudentListSuccess(response));
  } catch (error) {
    console.log('error fetch student list', error);
    yield put(studentActions.getStudentListFailed());
  }
}

export default function* studentSaga() {
  yield takeLatest(studentActions.getStudentList.type, getStudentList);
}
