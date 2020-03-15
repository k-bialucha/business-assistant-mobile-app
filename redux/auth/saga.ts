import { put, takeEvery } from 'redux-saga/effects';

import { loginSuccess } from './actions';
import { LOGIN } from './types';

const delay = (timeout: number) =>
  new Promise<void>(res => setTimeout(res, timeout));

export function* loginSaga() {
  yield delay(1000);

  const someToken: string = 'highly-secure-token';

  yield put(loginSuccess(someToken));
}

export default function* watchSaga() {
  yield takeEvery(LOGIN, loginSaga);
}
