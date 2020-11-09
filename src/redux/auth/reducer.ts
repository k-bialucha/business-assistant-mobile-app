import { Keyboard } from 'react-native';

import {
  AuthActions,
  CLEAR_ERROR_STATE,
  ErrorObject,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_WITH_FACEBOOK,
  LOGIN_WITH_GOOGLE,
  LOGOUT,
  RequestStatus,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  TRY_AUTO_LOGIN,
} from './types';

export interface AuthState {
  isAuthenticated: boolean | null;
  username: string | null;
  userId: string | null;
  userImage: string | null;
  requestStatus: RequestStatus | null;
  error: ErrorObject | null;
}

export const initialState: AuthState = {
  isAuthenticated: null,
  username: null,
  userId: null,
  userImage: null,
  requestStatus: RequestStatus.UNAUTHENTICATED,
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
        userData: { username, id, image },
      } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        username,
        userId: id,
        userImage: image || null,
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
        isAuthenticated: false,
        requestStatus: RequestStatus.FAILURE,
        error,
      };
    }

    case LOGOUT: {
      return initialState;
    }

    case SIGNUP:
      Keyboard.dismiss();

      return {
        ...state,
        requestStatus: RequestStatus.LOADING,
      };

    case SIGNUP_SUCCESS: {
      const {
        userData: { username, id },
      } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        username,
        userId: id,
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
        isAuthenticated: false,
        requestStatus: RequestStatus.FAILURE,
        error,
      };
    }

    case TRY_AUTO_LOGIN:
      return {
        ...state,
        requestStatus: RequestStatus.LOADING,
      };

    case CLEAR_ERROR_STATE: {
      return {
        ...state,
        error: null,
        requestStatus: null,
      };
    }

    default:
      return state;
  }
}

export default reducer;
