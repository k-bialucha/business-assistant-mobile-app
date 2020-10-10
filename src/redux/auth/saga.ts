import { Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import decode from 'jwt-decode';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { ANDROID_CLIENT_ID, FACEBOOK_APP_ID, IOS_CLIENT_ID } from '~env';

import { loginUser, signupUser } from '~/utils/apiCalls/authorization';
import firebase, { myFirebaseApp } from '~/utils/firebase';

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
  RESET_PASSWORD,
  ResetPasswordAction,
  SIGNUP,
  SignupAction,
  TRY_AUTO_LOGIN,
} from './types';

export function* loginSaga({ payload: { email, password } }: LoginAction) {
  try {
    yield delay(1000);

    const response = yield call(loginUser, email, password);

    const {
      idToken: token,
      localId: userId,
      profilePicture,
      expiresIn,
    } = response;

    const tokenExpiryTimestamp = Date.now() / 1000 + expiresIn;

    yield put(
      loginSuccess(token, {
        username: email,
        id: userId,
        image: profilePicture,
      })
    );
    yield call(
      AsyncStorage.setItem,
      'userData',
      JSON.stringify({
        token,
        username: email,
        id: userId,
        image: profilePicture,
        tokenExpiryTimestamp,
      })
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

    yield put(signupSuccess(token, { username: email, id: userId }));
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
    const response: Facebook.FacebookLoginResult = yield call(
      Facebook.logInWithReadPermissionsAsync,
      {
        permissions: ['public_profile', 'email'],
      }
    );

    if (response.type === 'success') {
      const { token } = response;
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

      const { user_id: userId, name, picture, exp } = decode(jwtToken);

      yield put(
        loginSuccess(token, { username: name, id: userId, image: picture })
      );
      yield call(
        AsyncStorage.setItem,
        'userData',
        JSON.stringify({
          token,
          username: name,
          id: userId,
          image: picture,
          tokenExpiryTimestamp: exp,
        })
      );
    } else if (response.type === 'cancel') {
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

      const { user_id: userId, name, picture, exp } = decode(jwtToken);

      yield put(
        loginSuccess(jwtToken, { username: name, id: userId, image: picture })
      );
      yield call(
        AsyncStorage.setItem,
        'userData',
        JSON.stringify({
          token: jwtToken,
          username: name,
          id: userId,
          image: picture,
          tokenExpiryTimestamp: exp,
        })
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

export function* resetPasswordSaga({
  payload: { email },
}: ResetPasswordAction) {
  try {
    const actionCodeSettings = {
      // to control if back to app after password change in browser
      url: '',
    };

    yield call(
      myFirebaseApp.auth.sendPasswordResetEmail,
      email,
      actionCodeSettings
    );

    Alert.alert(
      'Reset Password',
      'Link to reset password has been sent to the email'
    );
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert('Reset Password', error.message);
    } else {
      Alert.alert('Reset Password', 'Something went wrong');
    }
  }
}
export function* tryAutoLoginSaga() {
  try {
    const jsonUserData = yield call(AsyncStorage.getItem, 'userData');

    if (!jsonUserData) throw new Error();

    const { token, id, username, image, tokenExpiryTimestamp } = JSON.parse(
      jsonUserData
    );

    if (!tokenExpiryTimestamp) throw new Error();

    const currentTimestamp = Date.now() / 1000;
    const tokenExpired = currentTimestamp > tokenExpiryTimestamp;

    if (tokenExpired) {
      // TODO: check if refresh token is valid

      // TODO: if true get new token and login

      // if false throw error and clear Storage User data
      yield call(AsyncStorage.removeItem, 'userData');
      throw new Error('Session expired. Please log in again.');
    } else {
      // TODO: refresh this token before pass into function below

      yield put(loginSuccess(token, { username, id, image }));
    }
  } catch (error) {
    yield put(setDidTryAutoLogin());
    yield put(loginFailure(error.message));
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
  yield takeLatest(RESET_PASSWORD, resetPasswordSaga);
  yield takeLatest(TRY_AUTO_LOGIN, tryAutoLoginSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}
