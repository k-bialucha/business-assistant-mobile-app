export const DOMAIN_NAME = 'auth';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export interface LoginAction {
  type: typeof LOGIN;
  payload: {
    username: string;
    password: string;
  };
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {
    token: string;
    userId: string;
  };
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActions =
  | LoginAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction;

export enum RequestStatus {
  UNAUTHENTICATED,
  LOADING,
  SUCCESS,
  FAILURE,
}
