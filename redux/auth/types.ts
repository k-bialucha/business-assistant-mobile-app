export const DOMAIN_NAME = 'auth';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SET_USER_DATA = 'SET_USER_DATA';

export interface LoginAction {
  type: typeof LOGIN;
  payload: {
    email: string;
    password: string;
  };
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {
    token: string;
  };
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export interface SignupAction {
  type: typeof SIGNUP;
  payload: {
    email: string;
    password: string;
    phone?: string;
  };
}

export interface SignupSuccessAction {
  type: typeof SIGNUP_SUCCESS;
  payload: {
    token: string;
  };
}

export interface SignupFailureAction {
  type: typeof SIGNUP_FAILURE;
  payload: string;
}

export interface SetUserDataAction {
  type: typeof SET_USER_DATA;
  payload: {
    name: string;
    id: string;
    image?: string;
  };
}

export type AuthActions =
  | LoginAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | SignupAction
  | SignupSuccessAction
  | SignupFailureAction
  | SetUserDataAction;

export enum RequestStatus {
  UNAUTHENTICATED,
  LOADING,
  SUCCESS,
  FAILURE,
}
