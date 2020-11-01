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
  SET_DID_TRY_AUTO_LOGIN,
  SetDidTryAutoLoginAction,
} from './types';

describe(`${DOMAIN_NAME}/reducer`, () => {
  it('handles login action', () => {
    const someEmail = 'some-email';
    const somePassword = 'hard-pass';

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
    const someToken = 'some-token';
    const mockedUserData = {
      username: 'user-name',
      id: 'user-id',
      image: 'user-image-url',
    };

    const previousState = {
      ...initialState,
      token: null,
      requestStatus: RequestStatus.LOADING,
    };

    const action: LoginSuccessAction = {
      type: LOGIN_SUCCESS,
      payload: { token: someToken, userData: mockedUserData },
    };

    const nextState: AuthState = reducer(previousState, action);

    const expectedState: AuthState = {
      ...initialState,
      token: someToken,
      username: mockedUserData.username,
      userImage: mockedUserData.image,
      userId: mockedUserData.id,
      requestStatus: RequestStatus.SUCCESS,
    };

    expect(nextState).toEqual(expectedState);
  });

  it('handles loginFailure action', () => {
    const someEmail = 'some-email';
    const someUserId = 'some-user-id';
    const someUserImage = 'some-user-image-url';

    const previousState: AuthState = {
      token: null,
      error: null,
      username: someEmail,
      userId: someUserId,
      userImage: someUserImage,
      requestStatus: RequestStatus.LOADING,
      didTryAutoLogin: false,
    };

    const action: LoginFailureAction = {
      type: LOGIN_FAILURE,
      payload: 'something bad happened',
    };

    const nextState: AuthState = reducer(previousState, action);

    const expectedState: AuthState = {
      token: null,
      error: {
        title: expect.any(String),
        message: expect.any(String),
      },
      username: someEmail,
      userId: someUserId,
      userImage: someUserImage,
      requestStatus: RequestStatus.FAILURE,
      didTryAutoLogin: false,
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
      didTryAutoLogin: false,
      error: null,
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
      didTryAutoLogin: false,
      error: null,
    };

    expect(nextState).toEqual(expectedState);
  });

  it('handles setDidTryAutoLogin action', () => {
    const previousState = {
      ...initialState,
      didTryAutoLogin: false,
    };

    const action: SetDidTryAutoLoginAction = {
      type: SET_DID_TRY_AUTO_LOGIN,
    };

    const nextState: AuthState = reducer(previousState, action);

    const expectedState: AuthState = {
      ...initialState,
      didTryAutoLogin: true,
    };

    expect(nextState).toEqual(expectedState);
  });
});
