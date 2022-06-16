import { PayloadAction } from '@reduxjs/toolkit';
import { delay, put, takeEvery } from 'redux-saga/effects';
import { fetchCount } from './counterAPI';
import { increment, incrementbySaga, incrementSuccessbySaga } from './counterSlice';

// export function* log(action: PayloadAction) {
//   console.log('log', action);
// }

function* test() {
  yield fetchCount(2);
}

export function* handleSuccessIncrement(action: PayloadAction<number>) {
  console.log('loading...');

  // loading
  yield delay(500);

  console.log('success');

  // dispatch action success
  yield put(incrementSuccessbySaga(action.payload));
}

export default function* counterSaga() {
  console.log('counter saga');
  // yield takeEvery('*', log);
  // yield takeEvery(incrementbySaga.toString(), handleSuccessIncrement);
  yield takeEvery(incrementbySaga.toString(), handleSuccessIncrement);
}
