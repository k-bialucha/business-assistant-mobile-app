import { login, logout } from './actions';
import { DOMAIN_NAME, LOGIN, LOGOUT } from './types';

describe(`${DOMAIN_NAME}/actions`, () => {
  test('login action returns correct object', () => {
    const someLogin: string = 'some-user';

    const result = login(someLogin);

    const expected = {
      type: LOGIN,
      payload: someLogin,
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
