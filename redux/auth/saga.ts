import { delay, put, takeLatest } from 'redux-saga/effects';

import { loginSuccess, loginFailure } from './actions';
import { LOGIN, LoginAction } from './types';

export function* loginSaga(action: LoginAction) {
  yield delay(1000);

  if (action.payload.password.length >= 5) {
    const someToken: string = 'highly-secure-token';

    yield put(loginSuccess(someToken));
  } else {
    yield put(loginFailure('terrible mistake'));
  }
}

export default function* watchSaga() {
  yield takeLatest(LOGIN, loginSaga);
}
