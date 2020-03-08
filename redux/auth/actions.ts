import { LOGIN, LOGOUT, LogoutAction, LoginAction } from './types';

export function login(username: string): LoginAction {
  return {
    type: LOGIN,
    payload: username,
  };
}

export function logout(): LogoutAction {
  return {
    type: LOGOUT,
  };
}
