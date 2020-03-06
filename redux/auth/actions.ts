import { LOGIN, LOGOUT, LogoutAction, LoginAction } from './types';

export function login(token: string): LoginAction {
  return {
    type: LOGIN,
    payload: token,
  };
}

export function logout(): LogoutAction {
  return {
    type: LOGOUT,
  };
}
