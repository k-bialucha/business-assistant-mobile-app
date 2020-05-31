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
} from './types';

export interface AuthState {
  token: string | null;
  username: string | null;
  userId: string | null;
  userImage: string | null;
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
        userImage: image || null,
        requestStatus: RequestStatus.SUCCESS,
      };
    }

    case LOGIN_FAILURE:
      Alert.alert('Something went wrong', action.payload);

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
        userImage: image || null,
        requestStatus: RequestStatus.SUCCESS,
      };
    }

    case SIGNUP_FAILURE:
      Alert.alert('Something went wrong', action.payload);

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
