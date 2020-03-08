import { LOGIN, LOGOUT, AuthActions } from './types';

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
        token: action.payload === 'admin' ? 'highly-secure-token' : null,
        username: action.payload,
      };

    case LOGOUT:
      return { token: null, username: null };

    default:
      return state;
  }
}

export default reducer;
