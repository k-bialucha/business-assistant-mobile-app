import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_WITH_FACEBOOK,
  LOGIN_WITH_GOOGLE,
  LoginAction,
  LoginFailureAction,
  LoginSuccessAction,
  LoginWithFacebookAction,
  LoginWithGoogleAction,
  LOGOUT,
  LogoutAction,
  SET_DID_TRY_AUTO_LOGIN,
  SetDidTryAutoLoginAction,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SignupAction,
  SignupFailureAction,
  SignupSuccessAction,
  TRY_AUTO_LOGIN,
  TryAutoLoginAction,
} from './types';

export function login(email: string, password: string): LoginAction {
  return {
    type: LOGIN,
    payload: { email, password },
  };
}

export function loginSuccess(token: string, userData): LoginSuccessAction {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token,
      userData: {
        name: userData.name,
        id: userData.id,
        image: userData.image,
      },
    },
  };
}

export function loginFailure(message?: string): LoginFailureAction {
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

export function signupSuccess(token: string, userData): SignupSuccessAction {
  return {
    type: SIGNUP_SUCCESS,
    payload: {
      token,
      userData: {
        name: userData.name,
        id: userData.id,
        image: userData.image,
      },
    },
  };
}

export function signupFailure(message: string): SignupFailureAction {
  return {
    type: SIGNUP_FAILURE,
    payload: message,
  };
}

export function loginWithFacebook(): LoginWithFacebookAction {
  return {
    type: LOGIN_WITH_FACEBOOK,
  };
}

export function loginWithGoogle(): LoginWithGoogleAction {
  return {
    type: LOGIN_WITH_GOOGLE,
  };
}

export function setDidTryAutoLogin(): SetDidTryAutoLoginAction {
  return {
    type: SET_DID_TRY_AUTO_LOGIN,
  };
}

export function tryAutoLogin(): TryAutoLoginAction {
  return {
    type: TRY_AUTO_LOGIN,
  };
}
