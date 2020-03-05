import { LOGIN, LOGOUT } from './types';

export const login = (token: string) => ({
  payload: token,
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});
