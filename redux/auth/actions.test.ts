import { login, logout } from './actions';
import { DOMAIN_NAME, LOGIN, LOGOUT } from './types';

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

  test('logout action returns correct object', () => {
    const result = logout();

    const expected = {
      type: LOGOUT,
    };

    expect(result).toEqual(expected);
  });
});
