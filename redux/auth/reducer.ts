import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  AuthActions,
} from './types';

export interface AuthState {
  token: string;
  username: string;
}

export const initialState: AuthState = {
  token: null,
  username: null,
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
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        token: null,
      };

    case LOGOUT:
      return { token: null, username: null };

    default:
      return state;
  }
}

export default reducer;
