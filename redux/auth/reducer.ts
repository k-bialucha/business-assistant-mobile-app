import { LOGIN, LOGOUT, AuthActions } from './types';

export interface AuthState {
  token?: string;
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
      return { token: action.payload };

    case LOGOUT:
      return { token: null };

    default:
      return state;
  }
}

export default reducer;
