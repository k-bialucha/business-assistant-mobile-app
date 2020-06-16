import axios, { AxiosRequestConfig } from 'axios';

import { FIREBASE_API_KEY } from '~env';

const firebaseAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  headers: { 'Content-Type': 'application/json' },
});

const config: AxiosRequestConfig = {
  params: {
    key: FIREBASE_API_KEY,
  },
};

export const loginUser = async (email: string, password: string) => {
  const data = {
    email,
    password,
    returnSecureToken: true,
  };

  const response = await firebaseAuth.post(
    `/accounts:signInWithPassword`,
    data,
    config
  );

  return response.data;
};

export const signupUser = async (
  email: string,
  password: string,
  phone?: string
) => {
  const data = {
    email,
    password,
    phone,
    returnSecureToken: true,
  };

  const response = await firebaseAuth.post(`/accounts:signUp`, data, config);

  return response.data;
};
