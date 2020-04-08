import reducer, { AuthState, initialState } from './reducer';
import {
  DOMAIN_NAME,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LoginAction,
  LoginFailureAction,
  LoginSuccessAction,
  LOGOUT,
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

  it('handles loginSuccess action', () => {
    const someUsername: string = 'some-username';
    const someToken: string = 'some-token';

    const previousState = {
      token: null,
      username: someUsername,
      requestStatus: RequestStatus.LOADING,
    };

    const action: LoginSuccessAction = {
      type: LOGIN_SUCCESS,
      payload: someToken,
    };

    const nextState: AuthState = reducer(previousState, action);

    const expectedState: AuthState = {
      token: someToken,
      username: someUsername,
      requestStatus: RequestStatus.SUCCESS,
    };

    expect(nextState).toEqual(expectedState);
  });

  it('handles loginFailure action', () => {
    const someUsername: string = 'some-username';

    const previousState = {
      token: null,
      username: someUsername,
      requestStatus: RequestStatus.LOADING,
    };

    const action: LoginFailureAction = {
      type: LOGIN_FAILURE,
      payload: 'something bad happened',
    };

    const nextState: AuthState = reducer(previousState, action);

    const expectedState: AuthState = {
      token: null,
      username: someUsername,
      requestStatus: RequestStatus.FAILURE,
    };

    expect(nextState).toEqual(expectedState);
  });

  it('handles logout action', () => {
    const previousState = {
      token: 'some-token',
      username: 'some-username',
      requestStatus: RequestStatus.SUCCESS,
    };

    const action: LogoutAction = {
      type: LOGOUT,
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
