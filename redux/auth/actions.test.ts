import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  setUserData,
  signup,
  signupFailure,
  signupSuccess,
} from './actions';
import {
  DOMAIN_NAME,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_USER_DATA,
  SetUserDataAction,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SignupAction,
  SignupFailureAction,
  SignupSuccessAction,
} from './types';

describe(`${DOMAIN_NAME}/actions`, () => {
  test('login action returns correct object', () => {
    const someEmail: string = 'some-email';
    const somePassword: string = 'some-password';

    const result = login(someEmail, somePassword);

    const expected = {
      type: LOGIN,
      payload: { email: someEmail, password: somePassword },
    };

    expect(result).toEqual(expected);
  });

  test('loginSuccess action returns correct object', () => {
    const someToken: string = 'some-secure-token';

    const result = loginSuccess(someToken);

    const expected = {
      type: LOGIN_SUCCESS,
      payload: {
        token: someToken,
      },
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

  test('signup action creator returns corrent object', () => {
    const mockedEmail: string = 'mocked-email@email.com';
    const mockedPassword: string = 'mocked-password';

    const result = signup(mockedEmail, mockedPassword);

    const expected: SignupAction = {
      type: SIGNUP,
      payload: { email: mockedEmail, password: mockedPassword },
    };

    expect(result).toEqual(expected);
  });

  test('signupSuccess action creator returns corrent object', () => {
    const mockedToken: string = 'mocked-secure-token';

    const result = signupSuccess(mockedToken);

    const expected: SignupSuccessAction = {
      type: SIGNUP_SUCCESS,
      payload: { token: mockedToken },
    };

    expect(result).toEqual(expected);
  });

  test('signupFailure action creator returns corrent object', () => {
    const mockedMessage = 'mocked-message';

    const result = signupFailure(mockedMessage);

    const extected: SignupFailureAction = {
      type: SIGNUP_FAILURE,
      payload: mockedMessage,
    };

    expect(result).toEqual(extected);
  });

  test('setUserData action creator returns corrent object', () => {
    const mockedData = {
      name: 'user-name',
      id: 'user-id',
      image: 'user-image-url',
    };

    const result = setUserData(mockedData);

    const extected: SetUserDataAction = {
      type: SET_USER_DATA,
      payload: mockedData,
    };

    expect(result).toEqual(extected);
  });
});
