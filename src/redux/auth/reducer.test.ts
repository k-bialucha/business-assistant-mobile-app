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
    const mockedUserData = {
      username: 'user-name',
      id: 'user-id',
      image: 'user-image-url',
    };

    const previousState: AuthState = {
      ...initialState,
      isAuthenticated: null,
      requestStatus: RequestStatus.LOADING,
    };

    const action: LoginSuccessAction = {
      type: LOGIN_SUCCESS,
      payload: { userData: mockedUserData },
    };

    const nextState: AuthState = reducer(previousState, action);

    const expectedState: AuthState = {
      ...initialState,
      isAuthenticated: true,
      username: mockedUserData.username,
      userImage: mockedUserData.image,
      userId: mockedUserData.id,
      requestStatus: RequestStatus.SUCCESS,
    };

    expect(nextState).toEqual(expectedState);
  });

  it('handles loginFailure action', () => {
    const someEmail: string = 'some-email';
    const someUserId: string = 'some-user-id';
    const someUserImage: string = 'some-user-image-url';

    const previousState: AuthState = {
      isAuthenticated: null,
      error: null,
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
      isAuthenticated: false,
      error: {
        title: expect.any(String),
        message: expect.any(String),
      },
      username: someEmail,
      userId: someUserId,
      userImage: someUserImage,
      requestStatus: RequestStatus.FAILURE,
    };

    expect(nextState).toEqual(expectedState);
  });

  it('handles logout action', () => {
    const previousState = {
      isAuthenticated: true,
      username: 'some-email',
      userId: 'some-user-id',
      userImage: 'url',
      requestStatus: RequestStatus.SUCCESS,
      error: null,
    };

    const action: LogoutAction = {
      type: LOGOUT,
    };

    const nextState: AuthState = reducer(previousState, action);

    const expectedState: AuthState = {
      isAuthenticated: null,
      username: null,
      userId: null,
      userImage: null,
      requestStatus: RequestStatus.UNAUTHENTICATED,
      error: null,
    };

    expect(nextState).toEqual(expectedState);
  });
});
