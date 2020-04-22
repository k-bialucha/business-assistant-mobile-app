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
  SET_USER_DATA,
  SetUserDataAction,
} from './types';

describe(`${DOMAIN_NAME}/reducer`, () => {
  it('handles login action', () => {
    const someEmail: string = 'some-email';
    const somePassword: string = 'hard-pass';

    const action: LoginAction = {
      type: LOGIN,
      payload: { email: someEmail, password: somePassword },
    };

    const nextState: AuthState = reducer(initialState, action);

    const expectedState: AuthState = {
      ...initialState,
      requestStatus: RequestStatus.LOADING,
    };

    expect(nextState).toEqual(expectedState);
  });

  it('handles loginSuccess action', () => {
    const someToken: string = 'some-token';

    const previousState = {
      ...initialState,
      token: null,
      requestStatus: RequestStatus.LOADING,
    };

    const action: LoginSuccessAction = {
      type: LOGIN_SUCCESS,
      payload: { token: someToken },
    };

    const nextState: AuthState = reducer(previousState, action);

    const expectedState: AuthState = {
      ...initialState,
      token: someToken,
      requestStatus: RequestStatus.SUCCESS,
    };

    expect(nextState).toEqual(expectedState);
  });

  it('handles loginFailure action', () => {
    const someEmail: string = 'some-email';
    const someUserId: string = 'some-user-id';
    const someUserImage: string = 'some-user-image-url';

    const previousState = {
      token: null,
      username: someEmail,
      userId: someUserId,
      userImage: someUserImage,
      requestStatus: RequestStatus.LOADING,
    };

    const action: LoginFailureAction = {
      type: LOGIN_FAILURE,
      payload: 'something bad happened',
    };

    const nextState: AuthState = reducer(previousState, action);

    const expectedState: AuthState = {
      token: null,
      username: someEmail,
      userId: someUserId,
      userImage: someUserImage,
      requestStatus: RequestStatus.FAILURE,
    };

    expect(nextState).toEqual(expectedState);
  });

  it('handles logout action', () => {
    const previousState = {
      token: 'some-token',
      username: 'some-email',
      userId: 'some-user-id',
      userImage: 'url',
      requestStatus: RequestStatus.SUCCESS,
    };

    const action: LogoutAction = {
      type: LOGOUT,
    };

    const nextState: AuthState = reducer(previousState, action);

    const expectedState: AuthState = {
      token: null,
      username: null,
      userId: null,
      userImage: null,
      requestStatus: RequestStatus.UNAUTHENTICATED,
    };

    expect(nextState).toEqual(expectedState);
  });

  it('handles setUserData action', () => {
    const previousState = {
      ...initialState,
      username: null,
      userId: null,
      userImage: null,
    };

    const action: SetUserDataAction = {
      type: SET_USER_DATA,
      payload: {
        name: 'mocked-name',
        id: 'user-id',
        image: 'url',
      },
    };

    const nextState: AuthState = reducer(previousState, action);

    const expectedState: AuthState = {
      ...initialState,
      username: 'mocked-name',
      userId: 'user-id',
      userImage: 'url',
    };

    expect(nextState).toEqual(expectedState);
  });
});
