import {
  AuthActions,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  RequestStatus,
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
}

export const initialState: AuthState = {
  token: null,
  username: null,
  userId: null,
  userImage: null,
  requestStatus: RequestStatus.UNAUTHENTICATED,
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

    default:
      return state;
  }
}

export default reducer;
