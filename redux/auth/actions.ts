import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LogoutAction,
  LoginSuccessAction,
  LoginFailureAction,
  LoginAction,
} from './types';

export function login(username: string, password: string): LoginAction {
  return {
    type: LOGIN,
    payload: { username, password },
  };
}

export function loginSuccess(token: string): LoginSuccessAction {
  return {
    type: LOGIN_SUCCESS,
    payload: token,
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
