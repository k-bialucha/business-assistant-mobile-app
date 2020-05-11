import axios, { AxiosRequestConfig } from 'axios';

import { FIREBASE_API_KEY } from '../../env';

const firebaseAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  headers: { 'Content-Type': 'application/json' },
});

const config: AxiosRequestConfig = {
  params: {
    key: FIREBASE_API_KEY,
  },
};

export const loginUser = (email, password) => {
  const data = {
    email,
    password,
    returnSecureToken: true,
  };

  return firebaseAuth
    .post(`/accounts:signInWithPassword`, data, config)
    .then(response => response.data);
};

export const signupUser = (email: string, password: string, phone?: string) => {
  const data = {
    email,
    password,
    phone,
    returnSecureToken: true,
  };

  return firebaseAuth
    .post(`/accounts:signUp`, data, config)
    .then(response => response.data);
};
