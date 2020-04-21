import * as Facebook from 'expo-facebook';
import decode from 'jwt-decode';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { loginUser, signupUser } from '../../utils/apiCalls/authorization';
import firebase from '../../utils/firebase';

import {
  loginFailure,
  loginSuccess,
  setUserData,
  signupFailure,
  signupSuccess,
} from './actions';
import {
  LOGIN,
  LOGIN_WITH_FACEBOOK,
  LoginAction,
  SIGNUP,
  SignupAction,
} from './types';

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

export function* loginWithFacebookSaga() {
  // TODO: move to .env file
  const fbAppId = '651283208782846';
  const fbAppName = 'Personal Business Assistance';

  yield Facebook.initializeAsync(fbAppId, fbAppName);
  try {
    const { type, token } = yield Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
    });

    if (type === 'success') {
      yield firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);

      const credential = yield firebase.auth.FacebookAuthProvider.credential(
        token
      );
      const { user } = yield firebase.auth().signInWithCredential(credential);
      const jwtToken = yield user.getIdToken();
      const { user_id: userId, name, picture } = decode(jwtToken);

      yield put(loginSuccess(token, userId));
      yield put(setUserData({ name, image: picture }));
    } else if (type === 'cancel') {
      throw new Error('Login to facebook canceled');
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(loginFailure(error.message));
    } else {
      yield put(loginFailure('Login Error'));
    }
  }
}

export default function* watchSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(LOGIN_WITH_FACEBOOK, loginWithFacebookSaga);
}
