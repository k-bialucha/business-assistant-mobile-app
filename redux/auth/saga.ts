import { Alert } from 'react-native';

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
  signupFailure,
  signupSuccess,
} from './actions';
import {
  LOGIN,
  LOGIN_WITH_FACEBOOK,
  LOGIN_WITH_GOOGLE,
  LoginAction,
  RESET_PASSWORD,
  ResetPasswordAction,
  SIGNUP,
  SignupAction,
} from './types';

export function* loginSaga({ payload: { email, password } }: LoginAction) {
  try {
    yield delay(1000);

    const response = yield call(loginUser, email, password);

    const { idToken: token, localId: userId } = response;

    yield put(loginSuccess(token, { name: email, id: userId }));
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
      // url: `https://www.example.com/?email=${email}`,
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

export default function* watchSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(SIGNUP, signupSaga);
  yield takeLatest(LOGIN_WITH_FACEBOOK, loginWithFacebookSaga);
  yield takeLatest(LOGIN_WITH_GOOGLE, loginWithGoogleSaga);
  yield takeLatest(RESET_PASSWORD, resetPasswordSaga);
}
