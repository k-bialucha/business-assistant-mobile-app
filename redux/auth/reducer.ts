import { Keyboard } from 'react-native';

import {
  AuthActions,
  CLEAR_ERROR_STATE,
  errorType,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_WITH_FACEBOOK,
  LOGIN_WITH_GOOGLE,
  LOGOUT,
  RequestStatus,
  SET_DID_TRY_AUTO_LOGIN,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  TRY_AUTO_LOGIN,
} from './types';

export interface AuthState {
  token: string;
  username: string;
  userId: string;
  userImage: string;
  requestStatus: RequestStatus;
  didTryAutoLogin: boolean;
  error: errorType;
}

export const initialState: AuthState = {
  token: null,
  username: null,
  userId: null,
  userImage: null,
  requestStatus: RequestStatus.UNAUTHENTICATED,
  didTryAutoLogin: false,
  error: null,
};

function reducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case LOGIN:
      Keyboard.dismiss();

      return {
        ...state,
        requestStatus: RequestStatus.LOADING,
      };

    case LOGIN_WITH_FACEBOOK:
      return {
        ...state,
        requestStatus: RequestStatus.LOADING,
      };

    case LOGIN_WITH_GOOGLE:
      return {
        ...state,
        requestStatus: RequestStatus.LOADING,
      };

    case LOGIN_SUCCESS: {
      const {
        token,
        userData: { name, id, image },
      } = action.payload;

      return {
        ...state,
        token,
        username: name,
        userId: id,
        userImage: image,
        requestStatus: RequestStatus.SUCCESS,
      };
    }

    case LOGIN_FAILURE: {
      let { error } = state;

      if (action.payload) {
        error = {
          title: 'Something went wrong',
          message: action.payload,
        };
      }

      return {
        ...state,
        token: null,
        requestStatus: RequestStatus.FAILURE,
        error,
      };
    }

    case LOGOUT:
      return initialState;

    case SIGNUP:
      Keyboard.dismiss();

      return {
        ...state,
        requestStatus: RequestStatus.LOADING,
      };

    case SIGNUP_SUCCESS: {
      const {
        token,
        userData: { name, id, image },
      } = action.payload;

      return {
        ...state,
        token,
        username: name,
        userId: id,
        userImage: image,
        requestStatus: RequestStatus.SUCCESS,
      };
    }

    case SIGNUP_FAILURE: {
      let { error } = state;

      if (action.payload) {
        error = {
          title: 'Something went wrong',
          message: action.payload,
        };
      }

      return {
        ...state,
        token: null,
        requestStatus: RequestStatus.FAILURE,
        error,
      };
    }

    case SET_DID_TRY_AUTO_LOGIN:
      return {
        ...state,
        didTryAutoLogin: true,
      };

    case TRY_AUTO_LOGIN:
      return {
        ...state,
        requestStatus: RequestStatus.LOADING,
      };

    case CLEAR_ERROR_STATE: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return state;
  }
}

export default reducer;
