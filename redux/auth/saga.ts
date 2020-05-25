import { AsyncStorage } from 'react-native';

import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import decode from 'jwt-decode';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { ANDROID_CLIENT_ID, FACEBOOK_APP_ID, IOS_CLIENT_ID } from '../../env';
import { loginUser, signupUser } from '../../utils/apiCalls/authorization';
import firebase, { myFirebaseApp } from '../../utils/firebase';

import {
  loginFailure,
  loginSuccess,
  setDidTryAutoLogin,
  signupFailure,
  signupSuccess,
} from './actions';
import {
  LOGIN,
  LOGIN_WITH_FACEBOOK,
  LOGIN_WITH_GOOGLE,
  LoginAction,
  LOGOUT,
  SIGNUP,
  SignupAction,
  TRY_AUTO_LOGIN,
} from './types';

export function* loginSaga({ payload: { email, password } }: LoginAction) {
  try {
    yield delay(1000);

    const response = yield call(loginUser, email, password);

    const { idToken: token, localId: userId } = response;

    yield put(loginSuccess(token, { name: email, id: userId }));
    yield call(
      AsyncStorage.setItem,
      'userData',
      JSON.stringify({ token, username: email, id: userId })
    );
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

    yield put(signupSuccess(token, { name: email, id: userId }));
    yield call(
      AsyncStorage.setItem,
      'userData',
      JSON.stringify({ token, username: email, id: userId })
    );
  } catch (error) {
    if (error instanceof Error) {
      yield put(signupFailure(error.message));
    } else {
      yield put(signupFailure('Signup Error'));
    }
  }
}

export function* loginWithFacebookSaga() {
  yield call(
    Facebook.initializeAsync,
    FACEBOOK_APP_ID,
    'Personal Business Assistant'
  );

  try {
    const { type, token } = yield call(Facebook.logInWithReadPermissionsAsync, {
      permissions: ['public_profile', 'email'],
    });

    if (type === 'success') {
      // https://stackoverflow.com/questions/53678410/jest-test-the-current-environment-does-not-support-the-specified-persistence-t
      // look like without it login works the same, to delete?

      // const persistence =
      //   process.env.NODE_ENV === 'test'
      //     ? firebase.auth.Auth.Persistence.NONE
      //     : firebase.auth.Auth.Persistence.LOCAL;

      // yield call(
      //   [firebase.auth(), firebase.auth().setPersistence],
      //   firebase.auth.Auth.Persistence.LOCAL
      // );
      const credential = yield call(
        firebase.auth.FacebookAuthProvider.credential,
        token
      );

      // way to call without redux-saga-firebase
      // const { user } = yield call(
      //   [firebase.auth(), firebase.auth().signInWithCredential],
      //   credential
      // );
      const { user } = yield call(
        myFirebaseApp.auth.signInWithCredential,
        credential
      );

      const jwtToken = yield user.getIdToken();

      const { user_id: userId, name, picture } = decode(jwtToken);

      yield put(loginSuccess(token, { name, id: userId, image: picture }));
      yield call(
        AsyncStorage.setItem,
        'userData',
        JSON.stringify({ token, username: name, id: userId, image: picture })
      );
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

export function* loginWithGoogleSaga() {
  try {
    const { type, idToken, accessToken } = yield call(Google.logInAsync, {
      iosClientId: IOS_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID,
      scopes: ['profile', 'email'],
    });

    if (type === 'success') {
      const credential = yield call(
        firebase.auth.GoogleAuthProvider.credential,
        idToken,
        accessToken
      );

      const { user } = yield call(
        myFirebaseApp.auth.signInWithCredential,
        credential
      );

      const jwtToken = yield user.getIdToken();

      const { user_id: userId, name, picture } = decode(jwtToken);

      yield put(loginSuccess(jwtToken, { name, id: userId, image: picture }));
      yield call(
        AsyncStorage.setItem,
        'userData',
        JSON.stringify({ jwtToken, username: name, id: userId, image: picture })
      );
    } else if (type === 'cancel') {
      throw new Error('Login to google canceled');
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(loginFailure(error.message));
    } else {
      yield put(loginFailure('Login Error'));
    }
  }
}

export function* tryAutoLoginSaga() {
  try {
    const jsonUserData = yield call(AsyncStorage.getItem, 'userData');

    if (!jsonUserData) {
      yield put(setDidTryAutoLogin());

      throw new Error();
    }

    const { token, id, name, image } = JSON.parse(jsonUserData);

    // TODO: check token expiry

    yield put(loginSuccess(token, { name, id, image }));
  } catch (error) {
    yield put(loginFailure());
  }
}

export function* logoutSaga() {
  yield AsyncStorage.removeItem('userData');
}

export default function* watchSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(LOGIN_WITH_FACEBOOK, loginWithFacebookSaga);
  yield takeLatest(LOGIN_WITH_GOOGLE, loginWithGoogleSaga);
  yield takeLatest(TRY_AUTO_LOGIN, tryAutoLoginSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}
