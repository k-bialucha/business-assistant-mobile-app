import { delay, put, takeLatest } from 'redux-saga/effects';

import { loginUser, signupUser } from '../../utils/apiCalls/authorization';

import {
  loginFailure,
  loginSuccess,
  signupFailure,
  signupSuccess,
} from './actions';
import { LOGIN, LoginAction, SIGNUP, SignupAction } from './types';

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

export function* signupSaga({
  payload: { email, password, phone },
}: SignupAction) {
  try {
    yield delay(1000);

    const response = yield signupUser(email, password, phone);

    console.log('response: ', response);

    const { idToken: token, localId: userId } = response;

    yield put(signupSuccess(token, userId));
  } catch (error) {
    yield put(signupFailure(error));
  }
}

export default function* watchSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(SIGNUP, signupSaga);
}
