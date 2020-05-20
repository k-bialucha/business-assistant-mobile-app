import {
  login,
  loginFailure,
  loginSuccess,
  loginWithFacebook,
  logout,
  resetPasswordFailure,
  resetPasswordSuccess,
  signup,
  signupFailure,
  signupSuccess,
  resetPassword,
} from './actions';
import {
  DOMAIN_NAME,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_WITH_FACEBOOK,
  LoginWithFacebookAction,
  LOGOUT,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
  ResetPasswordFailureAction,
  ResetPasswordSuccessAction,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SignupAction,
  SignupFailureAction,
  SignupSuccessAction,
  ResetPasswordAction,
  RESET_PASSWORD,
} from './types';

describe(`${DOMAIN_NAME}/actions`, () => {
  test('login action creator returns correct object', () => {
    const someEmail: string = 'some-email';
    const somePassword: string = 'some-password';

    const result = login(someEmail, somePassword);

    const expected = {
      type: LOGIN,
      payload: { email: someEmail, password: somePassword },
    };

    expect(result).toEqual(expected);
  });

  test('loginSuccess action creator returns correct object', () => {
    const someToken: string = 'some-secure-token';
    const mockedUserData = {
      name: 'user-name',
      id: 'user-id',
      image: 'user-image-url',
    };

    const result = loginSuccess(someToken, mockedUserData);

    const expected = {
      type: LOGIN_SUCCESS,
      payload: {
        token: someToken,
        userData: mockedUserData,
      },
    };

    expect(result).toEqual(expected);
  });

  test('loginFailure action creator returns correct object', () => {
    const someMessage: string = 'something bad happened';

    const result = loginFailure(someMessage);

    const expected = {
      type: LOGIN_FAILURE,
      payload: someMessage,
    };

    expect(result).toEqual(expected);
  });

  test('logout action creator returns correct object', () => {
    const result = logout();

    const expected = {
      type: LOGOUT,
    };

    expect(result).toEqual(expected);
  });

  test('signup action creator returns correct object', () => {
    const mockedEmail: string = 'mocked-email@email.com';
    const mockedPassword: string = 'mocked-password';

    const result = signup(mockedEmail, mockedPassword);

    const expected: SignupAction = {
      type: SIGNUP,
      payload: { email: mockedEmail, password: mockedPassword },
    };

    expect(result).toEqual(expected);
  });

  test('signupSuccess action creator returns correct object', () => {
    const mockedToken: string = 'mocked-secure-token';
    const mockedUserData = {
      name: 'user-name',
      id: 'user-id',
      image: 'user-image-url',
    };

    const result = signupSuccess(mockedToken, mockedUserData);

    const expected: SignupSuccessAction = {
      type: SIGNUP_SUCCESS,
      payload: { token: mockedToken, userData: mockedUserData },
    };

    expect(result).toEqual(expected);
  });

  test('signupFailure action creator returns correct object', () => {
    const mockedMessage = 'mocked-message';

    const result = signupFailure(mockedMessage);

    const expected: SignupFailureAction = {
      type: SIGNUP_FAILURE,
      payload: mockedMessage,
    };

    expect(result).toEqual(expected);
  });

  test('loginWithFacebook action creator returns correct object', () => {
    const result = loginWithFacebook();

    const expected: LoginWithFacebookAction = {
      type: LOGIN_WITH_FACEBOOK,
    };

    expect(result).toEqual(expected);
  });

  test('resetPassword action creator returns correct object', () => {
    const mockedEmail: string = 'mocked-email@email.com';

    const result = resetPassword(mockedEmail);

    const expected: ResetPasswordAction = {
      type: RESET_PASSWORD,
      payload: { email: mockedEmail },
    };

    expect(result).toEqual(expected);
  });
});
