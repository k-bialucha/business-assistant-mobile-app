import { Alert, Keyboard } from 'react-native';

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
  TRY_AUTO_LOGIN,
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
      Keyboard.dismiss();

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
      if (action.payload) Alert.alert('Something went wrong', action.payload);

      return {
        ...state,
        token: null,
        requestStatus: RequestStatus.FAILURE,
      };

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

    case SIGNUP_FAILURE:
      if (action.payload) Alert.alert('Something went wrong', action.payload);

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

    case TRY_AUTO_LOGIN:
      return {
        ...state,
        requestStatus: RequestStatus.LOADING,
      };

    default:
      return state;
  }
}

export default reducer;
