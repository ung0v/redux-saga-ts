import { authSaga } from 'features/auth/authSaga';
import counterSaga from 'features/counter/counterSaga';
import { all } from 'redux-saga/effects';

function* helloSaga() {
  console.log('Hello saga');
}

export default function* rootSaga() {
  console.log('Root Saga');

  yield all([helloSaga(), counterSaga(), authSaga()]);
}
