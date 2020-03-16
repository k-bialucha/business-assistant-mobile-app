import reducer, { AuthState, initialState } from './reducer';
import {
  DOMAIN_NAME,
  LOGIN,
  LOGOUT,
  LoginAction,
  LogoutAction,
  RequestStatus,
} from './types';

describe(`${DOMAIN_NAME}/reducer`, () => {
  it('handles login action', () => {
    const someUsername: string = 'some-username';
    const somePassword: string = 'hard-pass';

    const action: LoginAction = {
      type: LOGIN,
      payload: { username: someUsername, password: somePassword },
    };

    const nextState: AuthState = reducer(initialState, action);

    const expectedState: AuthState = {
      token: null,
      username: someUsername,
      requestStatus: RequestStatus.LOADING,
    };

    expect(nextState).toEqual(expectedState);
  });

  it('handles logout action', () => {
    const action: LogoutAction = {
      type: LOGOUT,
    };

    const previousState = {
      token: 'some-token',
      username: 'some-username',
      requestStatus: RequestStatus.SUCCESS,
    };

    const nextState: AuthState = reducer(previousState, action);

    const expectedState: AuthState = {
      token: null,
      username: null,
      requestStatus: RequestStatus.UNAUTHENTICATED,
    };

    expect(nextState).toEqual(expectedState);
  });
});
