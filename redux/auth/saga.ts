import { call, delay, put, takeLatest } from 'redux-saga/effects';

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

    const response = yield call(loginUser, username, password);

    const { idToken: token, localId: userId } = response;

    yield put(loginSuccess(token, userId));
  } catch (error) {
    if (error instanceof Error) {
      yield put(loginFailure(error.message));
    } else {
      yield put(loginFailure('Login Error'));
    }
  }
}

export function* signupSaga({
  payload: { email, password, phone },
}: SignupAction) {
  try {
    yield delay(1000);

    const response = yield call(signupUser, email, password, phone);

    const { idToken: token, localId: userId } = response;

    yield put(signupSuccess(token, userId));
  } catch (error) {
    if (error instanceof Error) {
      yield put(signupFailure(error.message));
    } else {
      yield put(signupFailure('Signup Error'));
    }
  }
}

export default function* watchSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(SIGNUP, signupSaga);
}
