import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGOUT,
  LogoutAction,
  LoginSuccessAction,
  LoginAction,
} from './types';

export function login(username: string): LoginAction {
  return {
    type: LOGIN,
    payload: username,
  };
}

export function loginSuccess(token: string): LoginSuccessAction {
  return {
    type: LOGIN_SUCCESS,
    payload: token,
  };
}

export function logout(): LogoutAction {
  return {
    type: LOGOUT,
  };
}
