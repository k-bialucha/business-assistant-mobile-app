import { LOGIN, LOGOUT, AuthActions } from './types';

export interface AuthState {
  token?: string;
  username?: string;
}

const initialState: AuthState = {
  token: null,
};

function reducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.payload === 'admin' ? 'hightly-secure-token' : null,
        username: action.payload,
      };

    case LOGOUT:
      return { token: null };

    default:
      return state;
  }
}

export default reducer;
