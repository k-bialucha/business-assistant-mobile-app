import {
  AuthActions,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  RequestStatus,
} from './types';

export interface AuthState {
  token: string;
  username: string;
  userId: string;
  requestStatus: RequestStatus;
}

export const initialState: AuthState = {
  token: null,
  username: null,
  userId: null,
  requestStatus: RequestStatus.UNAUTHENTICATED,
};

function reducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case LOGIN:
      return {
        token: null,
        username: action.payload.username,
        requestStatus: RequestStatus.LOADING,
      };

    case LOGIN_SUCCESS: {
      const { token, userId } = action.payload;

      return {
        ...state,
        token,
        userId,
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

    default:
      return state;
  }
}

export default reducer;
