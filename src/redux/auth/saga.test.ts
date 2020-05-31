import { put } from 'redux-saga/effects';

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

jest.mock('~~env');

describe(`${DOMAIN_NAME}/saga`, () => {
  describe('loginSaga', () => {
    it('handles successful login', () => {
      const someApiResponse = {
        idToken: 'token-123',
        localId: '12345',
      };
      const mockedEmail = 'some-email';

      const generator = loginSaga({
        type: LOGIN,
        payload: { email: mockedEmail, password: 'strong-password' },
      });

      const delayDescriptor = generator.next().value;
      const apiCallDescriptor = generator.next().value;
      const putDescriptor = generator.next(someApiResponse).value;
      const saveToAsyncStorage = generator.next().value;

      expect(delayDescriptor).toMatchSnapshot();
      expect(apiCallDescriptor).toMatchSnapshot();
      expect(putDescriptor).toEqual(
        put({
          type: LOGIN_SUCCESS,
          payload: {
            token: someApiResponse.idToken,
            userData: {
              id: someApiResponse.localId,
              image: undefined,
              name: mockedEmail,
            },
          },
        })
      );
      expect(saveToAsyncStorage).toMatchSnapshot();
      expect(generator.next().done).toBe(true);
    });

    it('handles unsuccessful login', () => {
      const someError = new Error('Bad Credentials');
      const generator = loginSaga({
        type: LOGIN,
        payload: { email: 'some-email', password: 'badpass' },
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
      const someApiResponse = {
        idToken: 'token-123',
        localId: '12345',
      };
      const mockedEmail = 'some-email@example.com';
      const generator = signupSaga({
        type: SIGNUP,
        payload: {
          email: mockedEmail,
          password: 'strong-password',
        },
      });

      const delayDescriptor = generator.next().value;
      const apiCallDescriptor = generator.next().value;
      const putDescriptor = generator.next(someApiResponse).value;
      const saveToAsyncStorage = generator.next().value;

      expect(delayDescriptor).toMatchSnapshot();
      expect(apiCallDescriptor).toMatchSnapshot();
      expect(putDescriptor).toEqual(
        put({
          type: SIGNUP_SUCCESS,
          payload: {
            token: someApiResponse.idToken,
            userData: {
              id: someApiResponse.localId,
              image: undefined,
              name: mockedEmail,
            },
          },
        })
      );
      expect(saveToAsyncStorage).toMatchSnapshot();
      expect(generator.next().done).toBe(true);
    });

    it('handles unsuccessful signup', () => {
      const someError = new Error('Bad Credentials');
      const generator = signupSaga({
        type: SIGNUP,
        payload: { email: 'some-email@example.com', password: 'badpass' },
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
        user: 'user',
      };

      const initializeFacebookApp = generator.next().value;

      expect(initializeFacebookApp).toMatchSnapshot();

      const loginWithFacebook = generator.next().value;

      expect(loginWithFacebook).toMatchSnapshot();

      // get credential to firebase auth with fb token
      const getCredentials = generator.next(facebookLoginResponse).value;

      expect(getCredentials).toMatchSnapshot();

      // sign in to firebase with received credentials
      const signToFirebaseWithCredentials = generator.next({
        token: '',
        type: '',
        user: 'user-object',
      }).value;

      expect(signToFirebaseWithCredentials).toMatchSnapshot();

      // get jwt token of created user in firebase
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

      expect(
        generator.next({
          user: {
            getIdToken: jest.fn(() => token),
          },
        }).value
      ).toEqual(token);

      expect(generator.next(token).value).toEqual(
        put(
          loginSuccess('mocked-token', {
            name: expect.any(String),
          })
        )
      );

      expect(generator.next().value).toMatchSnapshot();

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
        user: 'user',
      };

      const loginWithGoogle = generator.next().value;

      expect(loginWithGoogle).toMatchSnapshot();

      // get credential to firebase auth with fb token
      const getCredentials = generator.next(googleLoginResponse).value;

      expect(getCredentials).toMatchSnapshot();

      // sign in to firebase with received credentials
      const signToFirebaseWithCredentials = generator.next({
        accessToken: 'mocked-token',
        idToken: 'mocked-id-token',
        type: '',
        user: 'user-object',
      }).value;

      expect(signToFirebaseWithCredentials).toMatchSnapshot();

      // get jwt token of created user in firebase
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

      expect(
        generator.next({
          user: {
            getIdToken: jest.fn(() => token),
          },
        }).value
      ).toEqual(token);

      expect(generator.next(token).value).toEqual(
        put(
          loginSuccess(token, {
            name: expect.any(String),
          })
        )
      );

      expect(generator.next().value).toMatchSnapshot();

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
