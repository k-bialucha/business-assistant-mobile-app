import reducer, { AuthState, initialState } from './reducer';
import { DOMAIN_NAME, LOGIN, LOGOUT, LoginAction, LogoutAction } from './types';

describe(`${DOMAIN_NAME}/reducer`, () => {
  it('handles login action for admin', () => {
    const adminUsername: string = 'admin';
    const action: LoginAction = {
      type: LOGIN,
      payload: adminUsername,
    };

    const nextState: AuthState = reducer(initialState, action);

    const expectedState: AuthState = {
      token: 'highly-secure-token',
      username: adminUsername,
    };

    expect(nextState).toEqual(expectedState);
  });

  it('handles login action for non-admin username', () => {
    const someUsername: string = 'other-user';
    const action: LoginAction = {
      type: LOGIN,
      payload: someUsername,
    };

    const nextState: AuthState = reducer(initialState, action);

    const expectedState: AuthState = {
      token: null,
      username: someUsername,
    };

    expect(nextState).toEqual(expectedState);
  });

  it('handles login action', () => {
    const action: LogoutAction = {
      type: LOGOUT,
    };

    const previousState = {
      token: 'some-token',
      username: 'some-username',
    };

    const nextState: AuthState = reducer(previousState, action);

    const expectedState: AuthState = {
      token: null,
      username: null,
    };

    expect(nextState).toEqual(expectedState);
  });
});
