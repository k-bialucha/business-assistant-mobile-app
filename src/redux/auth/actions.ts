import {
  CLEAR_ERROR_STATE,
  ClearErrorStateAction,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_WITH_FACEBOOK,
  LOGIN_WITH_GOOGLE,
  LoginAction,
  LoginFailureAction,
  LoginSuccessAction,
  LoginWithFacebookAction,
  LoginWithGoogleAction,
  LOGOUT,
  LogoutAction,
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
  UserData,
} from './types';

export function login(email: string, password: string): LoginAction {
  return {
    type: LOGIN,
    payload: { email, password },
  };
}

export function loginSuccess(userData: UserData): LoginSuccessAction {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      userData,
    },
  };
}

export function loginFailure(message?: string): LoginFailureAction {
  return {
    type: LOGIN_FAILURE,
    payload: message,
  };
}

export function logout(): LogoutAction {
  return {
    type: LOGOUT,
  };
}

export function signup(
  email: string,
  password: string,
  phone?: string
): SignupAction {
  return {
    type: SIGNUP,
    payload: { email, phone, password },
  };
}

export function signupSuccess(userData: UserData): SignupSuccessAction {
  return {
    type: SIGNUP_SUCCESS,
    payload: {
      userData,
    },
  };
}

export function signupFailure(message: string): SignupFailureAction {
  return {
    type: SIGNUP_FAILURE,
    payload: message,
  };
}

export function loginWithFacebook(): LoginWithFacebookAction {
  return {
    type: LOGIN_WITH_FACEBOOK,
  };
}

export function loginWithGoogle(): LoginWithGoogleAction {
  return {
    type: LOGIN_WITH_GOOGLE,
  };
}

export function resetPassword(email: string): ResetPasswordAction {
  return {
    type: RESET_PASSWORD,
    payload: { email },
  };
}

export function tryAutoLogin(): TryAutoLoginAction {
  return {
    type: TRY_AUTO_LOGIN,
  };
}

export function clearErrorState(): ClearErrorStateAction {
  return {
    type: CLEAR_ERROR_STATE,
  };
}
