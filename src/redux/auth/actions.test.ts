import {
  login,
  loginFailure,
  loginSuccess,
  loginWithFacebook,
  loginWithGoogle,
  logout,
  resetPassword,
  signup,
  signupFailure,
  signupSuccess,
  tryAutoLogin,
} from './actions';
import {
  DOMAIN_NAME,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_WITH_FACEBOOK,
  LOGIN_WITH_GOOGLE,
  LoginWithFacebookAction,
  LoginWithGoogleAction,
  LOGOUT,
  RESET_PASSWORD,
  ResetPasswordAction,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SignupAction,
  SignupFailureAction,
  SignupSuccessAction,
  TRY_AUTO_LOGIN,
  TryAutoLoginAction,
} from './types';

describe(`${DOMAIN_NAME}/actions`, () => {
  test('login action creator returns correct object', () => {
    const someEmail = 'some-email';
    const somePassword = 'some-password';

    const result = login(someEmail, somePassword);

    const expected = {
      type: LOGIN,
      payload: { email: someEmail, password: somePassword },
    };

    expect(result).toEqual(expected);
  });

  test('loginSuccess action creator returns correct object', () => {
    const mockedUserData = {
      username: 'user-name',
      id: 'user-id',
      image: 'user-image-url',
    };

    const result = loginSuccess(mockedUserData);

    const expected = {
      type: LOGIN_SUCCESS,
      payload: {
        userData: mockedUserData,
      },
    };

    expect(result).toEqual(expected);
  });

  test('loginFailure action creator returns correct object', () => {
    const someMessage = 'something bad happened';

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
    const mockedEmail = 'mocked-email@email.com';
    const mockedPassword = 'mocked-password';

    const result = signup(mockedEmail, mockedPassword);

    const expected: SignupAction = {
      type: SIGNUP,
      payload: { email: mockedEmail, password: mockedPassword },
    };

    expect(result).toEqual(expected);
  });

  test('signupSuccess action creator returns correct object', () => {
    const mockedUserData = {
      username: 'user-name',
      id: 'user-id',
      image: 'user-image-url',
    };

    const result = signupSuccess(mockedUserData);

    const expected: SignupSuccessAction = {
      type: SIGNUP_SUCCESS,
      payload: { userData: mockedUserData },
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

  test('loginWithGoogle action creator returns correct object', () => {
    const result = loginWithGoogle();

    const expected: LoginWithGoogleAction = {
      type: LOGIN_WITH_GOOGLE,
    };

    expect(result).toEqual(expected);
  });

  test('resetPassword action creator returns correct object', () => {
    const mockedEmail = 'mocked-email@email.com';

    const result = resetPassword(mockedEmail);

    const expected: ResetPasswordAction = {
      type: RESET_PASSWORD,
      payload: { email: mockedEmail },
    };

    expect(result).toEqual(expected);
  });

  test('tryAutoLogin action creator returns correct object', () => {
    const result = tryAutoLogin();

    const expected: TryAutoLoginAction = {
      type: TRY_AUTO_LOGIN,
    };

    expect(result).toEqual(expected);
  });
});
