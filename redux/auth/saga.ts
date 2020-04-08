import { delay, put, takeLatest } from 'redux-saga/effects';

import { loginUser } from '../../utils/apiCalls/authorization';

import { loginFailure, loginSuccess } from './actions';
import { LOGIN, LoginAction } from './types';

export function* loginSaga({ payload: { username, password } }: LoginAction) {
  try {
    yield delay(1000);

    const response = yield loginUser(username, password);

    const { idToken: token, localId: userId } = response;

    yield put(loginSuccess(token, userId));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

export default function* watchSaga() {
  yield takeLatest(LOGIN, loginSaga);
}
