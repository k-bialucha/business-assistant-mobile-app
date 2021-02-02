import { Alert } from 'react-native';

import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

import { ANDROID_CLIENT_ID, FACEBOOK_APP_ID, IOS_CLIENT_ID } from '~env';

import { firebase, getCurrentUser } from '~/utils/firebase';

import {
  loginFailure,
  loginSuccess,
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
  UserData,
} from './types';

export function* loginSaga({ payload: { email, password } }: LoginAction) {
  try {
    yield delay(1000);

    const { user } = yield call(
      [firebase.auth(), firebase.auth().signInWithEmailAndPassword],
      email,
      password
    );

    yield put(
      loginSuccess({
        username: user.displayName || email,
        id: user.uid,
        image: user.photoURL,
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

export function* signupSaga({ payload: { email, password } }: SignupAction) {
  try {
    yield delay(1000);

    const { user } = yield call(
      [firebase.auth(), firebase.auth().createUserWithEmailAndPassword],
      email,
      password
    );
    // TODO: save phone number for registered user

    yield put(signupSuccess({ username: user.email, id: user.uid }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(signupFailure(error.message));
    } else {
      yield put(signupFailure('Signup Error'));
    }
  }
}

// FIXME: still log in with  Fb in iOS by Facebook App doesn't work (not redirecting back to app)
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

      const credential = yield call(
        firebase.auth.FacebookAuthProvider.credential,
        token
      );

      const { user } = yield call(
        [firebase.auth(), firebase.auth().signInWithCredential],
        credential
      );

      yield put(
        loginSuccess({
          username: user.displayName,
          id: user.uid,
          image: user.photoURL,
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
        [firebase.auth(), firebase.auth().signInWithCredential],
        credential
      );

      yield put(
        loginSuccess({
          username: user.displayName,
          id: user.uid,
          image: user.photoURL,
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
    yield call(
      [firebase.auth(), firebase.auth().sendPasswordResetEmail],
      email
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
    const user = yield call(getCurrentUser);

    if (user) {
      // we can access the token by calling method below
      // const token = yield user.getIdToken();

      const userData: UserData = {
        id: user.uid,
        username: user.displayName || user.email || `User ID ${user.uid}`,
      };

      if (user.photoURL) userData.image = user.photoURL;

      yield put(loginSuccess(userData));
    } else {
      throw new Error();
    }
  } catch (error) {
    yield put(loginFailure());
  }
}

export function* logoutSaga() {
  yield call([firebase.auth(), firebase.auth().signOut]);
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
