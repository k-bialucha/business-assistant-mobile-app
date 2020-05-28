export const DOMAIN_NAME = 'auth';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const LOGIN_WITH_FACEBOOK = 'LOGIN_WITH_FACEBOOK';
export const LOGIN_WITH_GOOGLE = 'LOGIN_WITH_GOOGLE';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const SET_DID_TRY_AUTO_LOGIN = 'SET_DID_TRY_AUTO_LOGIN';
export const TRY_AUTO_LOGIN = 'TRY_AUTO_LOGIN';

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
    userData: {
      name: string;
      id: string;
      image?: string;
    };
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
    userData: {
      name: string;
      id: string;
      image?: string;
    };
  };
}

export interface SignupFailureAction {
  type: typeof SIGNUP_FAILURE;
  payload: string;
}

export interface LoginWithFacebookAction {
  type: typeof LOGIN_WITH_FACEBOOK;
}

export interface LoginWithGoogleAction {
  type: typeof LOGIN_WITH_GOOGLE;
}

export interface ResetPasswordAction {
  type: typeof RESET_PASSWORD;
  payload: { email: string };
}

export interface SetDidTryAutoLoginAction {
  type: typeof SET_DID_TRY_AUTO_LOGIN;
}

export interface TryAutoLoginAction {
  type: typeof TRY_AUTO_LOGIN;
}

export type AuthActions =
  | LoginAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | SignupAction
  | SignupSuccessAction
  | SignupFailureAction
  | LoginWithFacebookAction
  | LoginWithGoogleAction
  | ResetPasswordAction
  | SetDidTryAutoLoginAction;

export enum RequestStatus {
  UNAUTHENTICATED,
  LOADING,
  SUCCESS,
  FAILURE,
}