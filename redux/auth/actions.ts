import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LoginAction,
  LoginFailureAction,
  LoginSuccessAction,
  LOGOUT,
  LogoutAction,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SignupAction,
  SignupFailureAction,
  SignupSuccessAction,
} from './types';

export function login(username: string, password: string): LoginAction {
  return {
    type: LOGIN,
    payload: { username, password },
  };
}

export function loginSuccess(
  token: string,
  userId: string
): LoginSuccessAction {
  return {
    type: LOGIN_SUCCESS,
    payload: { token, userId },
  };
}

export function loginFailure(message: string): LoginFailureAction {
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

export function signupSuccess(
  token: string,
  userId: string
): SignupSuccessAction {
  return {
    type: SIGNUP_SUCCESS,
    payload: { token, userId },
  };
}

export function signupFailure(message: string): SignupFailureAction {
  return {
    type: SIGNUP_FAILURE,
    payload: message,
  };
}
