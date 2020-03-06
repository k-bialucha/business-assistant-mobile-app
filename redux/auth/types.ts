export const LOGIN = 'LOGIN';

export const LOGOUT = 'LOGOUT';

export interface LoginAction {
  type: typeof LOGIN;
  payload: string;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActions = LoginAction | LogoutAction;
