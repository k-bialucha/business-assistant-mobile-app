import { login, loginSuccess, loginFailure, logout } from './actions';
import {
  DOMAIN_NAME,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './types';

describe(`${DOMAIN_NAME}/actions`, () => {
  test('login action returns correct object', () => {
    const someUsername: string = 'some-username';
    const somePassword: string = 'some-password';

    const result = login(someUsername, somePassword);

    const expected = {
      type: LOGIN,
      payload: { username: someUsername, password: somePassword },
    };

    expect(result).toEqual(expected);
  });

  test('loginSuccess action returns correct object', () => {
    const someToken: string = 'some-secure-token';

    const result = loginSuccess(someToken);

    const expected = {
      type: LOGIN_SUCCESS,
      payload: someToken,
    };

    expect(result).toEqual(expected);
  });

  test('loginFailure action returns correct object', () => {
    const someMessage: string = 'something bad happened';

    const result = loginFailure(someMessage);

    const expected = {
      type: LOGIN_FAILURE,
      payload: someMessage,
    };

    expect(result).toEqual(expected);
  });

  test('logout action returns correct object', () => {
    const result = logout();

    const expected = {
      type: LOGOUT,
    };

    expect(result).toEqual(expected);
  });
});
