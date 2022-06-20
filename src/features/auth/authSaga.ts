import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(1000);
    console.log('handle login', payload);
    localStorage.setItem('access_token', '123');
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'vuongvq',
      })
    );
    yield put(push('/admin'));
  } catch (error: any) {
    yield put(authActions.loginFailed(error.message));
  }
}

function* handleLogout() {
  yield delay(2000);
  console.log('handle logout');
  const isLogged = localStorage.removeItem('access_token');
  yield put(push('/login'));
  // redirect to login page
}
function* watchLoginFlow() {
  while (1) {
    console.log('watch login');
    const isLogged = localStorage.getItem('access_token');
    if (!isLogged) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
