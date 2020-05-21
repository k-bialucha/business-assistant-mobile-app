import { AsyncStorage } from 'react-native';

import {
  AuthActions,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  RequestStatus,
  SET_DID_TRY_AUTO_LOGIN,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
} from './types';

export interface AuthState {
  token: string;
  username: string;
  userId: string;
  userImage: string;
  requestStatus: RequestStatus;
  didTryAutoLogin: boolean;
}

export const initialState: AuthState = {
  token: null,
  username: null,
  userId: null,
  userImage: null,
  requestStatus: RequestStatus.UNAUTHENTICATED,
  didTryAutoLogin: false,
};

function reducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case LOGIN:
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

    case LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        requestStatus: RequestStatus.FAILURE,
      };

    case LOGOUT:
      AsyncStorage.removeItem('userData');

      return initialState;

    case SIGNUP:
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

    case SIGNUP_FAILURE:
      return {
        ...state,
        token: null,
        requestStatus: RequestStatus.FAILURE,
      };

    case SET_DID_TRY_AUTO_LOGIN:
      return {
        ...state,
        didTryAutoLogin: true,
      };

    default:
      return state;
  }
}

export default reducer;
