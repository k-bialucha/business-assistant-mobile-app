import { put } from 'redux-saga/effects';

import {
  someLoginApiResponse,
  someSignupApiResponse,
} from '~/utils/__mocks__/firebase';

import { loginFailure, loginSuccess } from './actions';
import {
  loginSaga,
  loginWithFacebookSaga,
  loginWithGoogleSaga,
  resetPasswordSaga,
  signupSaga,
} from './saga';
import {
  DOMAIN_NAME,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  RESET_PASSWORD,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
} from './types';

jest.mock('~env');
jest.mock('~/utils/firebase');

describe(`${DOMAIN_NAME}/saga`, () => {
  describe('loginSaga', () => {
    it('handles successful login', () => {
      const mockedEmail = 'some@email.com';

      const generator = loginSaga({
        type: LOGIN,
        payload: { email: mockedEmail, password: 'strong-password' },
      });

      const delayDescriptor = generator.next().value;
      const apiCallDescriptor = generator.next().value;
      const putDescriptor = generator.next(someLoginApiResponse).value;

      expect(delayDescriptor).toMatchSnapshot();
      expect(apiCallDescriptor).toMatchSnapshot();
      expect(putDescriptor).toEqual(
        put({
          type: LOGIN_SUCCESS,
          payload: {
            userData: {
              id: someLoginApiResponse.user.uid,
              image: someLoginApiResponse.user.photoURL,
              username: someLoginApiResponse.user.displayName,
            },
          },
        })
      );
      expect(generator.next().done).toBe(true);
    });

    it('handles unsuccessful login', () => {
      const someError = new Error('Bad Credentials');
      const generator = loginSaga({
        type: LOGIN,
        payload: { email: 'some@email.com', password: 'badpass' },
      });

      const delayDescriptor = generator.next().value;
      const apiCallDescriptor = generator.next().value;
      const putDescriptor = generator.throw(someError).value;

      expect(delayDescriptor).toMatchSnapshot();
      expect(apiCallDescriptor).toMatchSnapshot();
      expect(putDescriptor).toEqual(
        put({ type: LOGIN_FAILURE, payload: someError.message })
      );
      expect(generator.next().done).toBe(true);
    });
  });

  describe('signupSaga', () => {
    it('handles successful signup', () => {
      const mockedEmail = 'some@email.com';
      const generator = signupSaga({
        type: SIGNUP,
        payload: {
          email: mockedEmail,
          password: 'strong-password',
        },
      });

      const delayDescriptor = generator.next().value;
      const apiCallDescriptor = generator.next().value;
      const putDescriptor = generator.next(someSignupApiResponse).value;

      expect(delayDescriptor).toMatchSnapshot();
      expect(apiCallDescriptor).toMatchSnapshot();
      expect(putDescriptor).toEqual(
        put({
          type: SIGNUP_SUCCESS,
          payload: {
            userData: {
              id: someSignupApiResponse.user.uid,
              image: undefined,
              username: someSignupApiResponse.user.email,
            },
          },
        })
      );
      expect(generator.next().done).toBe(true);
    });

    it('handles unsuccessful signup', () => {
      const someError = new Error('Bad Credentials');
      const generator = signupSaga({
        type: SIGNUP,
        payload: { email: 'some@email.com', password: 'badpass' },
      });

      const delayDescriptor = generator.next().value;
      const apiCallDescriptor = generator.next().value;
      const putDescriptor = generator.throw(someError).value;

      expect(delayDescriptor).toMatchSnapshot();
      expect(apiCallDescriptor).toMatchSnapshot();
      expect(putDescriptor).toEqual(
        put({ type: SIGNUP_FAILURE, payload: someError.message })
      );
      expect(generator.next().done).toBe(true);
    });
  });

  describe('loginWithFacebookSaga', () => {
    it('handles successful signup through facebook', () => {
      const generator: Generator = loginWithFacebookSaga();

      const facebookLoginResponse = {
        token: 'mocked-token',
        type: 'success',
      };
      const someCredentials = {
        providerId: 'mocked-provider-id',
        signInMethod: 'signin-method',
        idToken: 'mocked-id-token',
      };

      const initializeFacebookApp = generator.next().value;

      expect(initializeFacebookApp).toMatchSnapshot();

      const loginWithFacebook = generator.next().value;

      expect(loginWithFacebook).toMatchSnapshot();

      // get credential to firebase auth with fb token
      const getCredentials = generator.next(facebookLoginResponse).value;

      expect(getCredentials).toMatchSnapshot();

      // sign in to firebase with received credentials
      const signToFirebaseWithCredentials = generator.next(someCredentials)
        .value;

      expect(signToFirebaseWithCredentials).toMatchSnapshot();

      expect(generator.next(someLoginApiResponse).value).toEqual(
        put(
          loginSuccess({
            username: someLoginApiResponse.user.displayName,
            id: someLoginApiResponse.user.uid,
            image: someLoginApiResponse.user.photoURL,
          })
        )
      );

      expect(generator.next().done).toBe(true);
    });

    it('handles canceled signup through facebook', () => {
      const generator: Generator = loginWithFacebookSaga();

      generator.next();
      generator.next();

      expect(generator.next({ type: 'cancel' }).value).toEqual(
        put(loginFailure('Login to facebook canceled'))
      );

      expect(generator.next().done).toBe(true);
    });
  });

  describe('loginWithGoogleSaga', () => {
    it('handles successful signup through google', () => {
      const generator: Generator = loginWithGoogleSaga();

      const googleLoginResponse = {
        accessToken: 'mocked-token',
        idToken: 'mocked-id-token',
        type: 'success',
      };

      const loginWithGoogle = generator.next().value;

      expect(loginWithGoogle).toMatchSnapshot();

      const getCredentials = generator.next(googleLoginResponse).value;

      expect(getCredentials).toMatchSnapshot();

      const signToFirebaseWithCredentials = generator.next({
        accessToken: 'mocked-token',
        idToken: 'mocked-id-token',
        type: '',
      }).value;

      expect(signToFirebaseWithCredentials).toMatchSnapshot();

      expect(generator.next(someLoginApiResponse).value).toEqual(
        put(
          loginSuccess({
            username: someLoginApiResponse.user.displayName,
            id: someLoginApiResponse.user.uid,
            image: someLoginApiResponse.user.photoURL,
          })
        )
      );

      expect(generator.next().done).toBe(true);
    });

    it('handles canceled signup through google', () => {
      const generator: Generator = loginWithGoogleSaga();

      generator.next();

      expect(generator.next({ type: 'cancel' }).value).toEqual(
        put(loginFailure('Login to google canceled'))
      );

      expect(generator.next().done).toBe(true);
    });
  });

  describe('resetPasswordSaga', () => {
    it('handles successful sending reset password form', () => {
      const mockedEmail = 'some@email.com';

      const generator = resetPasswordSaga({
        type: RESET_PASSWORD,
        payload: { email: mockedEmail },
      });

      const resetPasswordCall = generator.next().value;

      expect(resetPasswordCall).toMatchSnapshot();
      expect(generator.next().done).toBe(true);
    });
  });
});
