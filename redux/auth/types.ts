export const DOMAIN_NAME = 'auth';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export interface LoginAction {
  type: typeof LOGIN;
  payload: string;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: string;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActions = LoginAction | LoginSuccessAction | LogoutAction;
