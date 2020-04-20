import { put } from 'redux-saga/effects';

import { loginSaga, signupSaga } from './saga';
import {
  DOMAIN_NAME,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
} from './types';

describe(`${DOMAIN_NAME}/saga`, () => {
  describe('loginSaga', () => {
    it('handles successful login', () => {
      const someApiResponse = {
        idToken: 'token-123',
        localId: '12345',
      };
      const generator = loginSaga({
        type: LOGIN,
        payload: { username: 'some-username', password: 'strong-password' },
      });

      const delayDescriptor = generator.next().value;
      const apiCallDescriptor = generator.next().value;
      const putDescriptor = generator.next(someApiResponse).value;

      expect(delayDescriptor).toMatchSnapshot();
      expect(apiCallDescriptor).toMatchSnapshot();
      expect(putDescriptor).toEqual(
        put({
          type: LOGIN_SUCCESS,
          payload: { token: expect.any(String), userId: expect.any(String) },
        })
      );
      expect(generator.next().done).toBe(true);
    });

    it('handles unsuccessful login', () => {
      const someError = new Error('Bad Credentials');
      const generator = loginSaga({
        type: LOGIN,
        payload: { username: 'some-username', password: 'badpass' },
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
      const generator = signupSaga({
        type: SIGNUP,
        payload: {
          email: 'some-email@example.com',
          password: 'strong-password',
        },
      });

      const delayDescriptor = generator.next().value;
      const apiCallDescriptor = generator.next().value;
      const putDescriptor = generator.next(someApiResponse).value;

      expect(delayDescriptor).toMatchSnapshot();
      expect(apiCallDescriptor).toMatchSnapshot();
      expect(putDescriptor).toEqual(
        put({
          type: SIGNUP_SUCCESS,
          payload: { token: expect.any(String), userId: expect.any(String) },
        })
      );
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
});
