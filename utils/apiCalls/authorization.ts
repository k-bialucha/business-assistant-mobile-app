import axios, { AxiosRequestConfig } from 'axios';
import { FIREBASE_API_KEY } from 'react-native-dotenv';

const firebaseAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  headers: { 'Content-Type': 'application/json' },
});

export const loginUser = (email, password) => {
  const data = {
    email,
    password,
    returnSecureToken: true,
  };
  const config: AxiosRequestConfig = {
    params: {
      key: FIREBASE_API_KEY,
    },
  };

  return firebaseAuth
    .post(`/accounts:signInWithPassword`, data, config)
    .then(response => response.data);
};

export const signupUser = (email: string, password: string, phone?: string) => {
  const data = {
    email,
    password,
    returnSecureToken: true,
  };
  const config: AxiosRequestConfig = {
    params: {
      key: FIREBASE_API_KEY,
    },
  };

  return firebaseAuth
    .post(`/accounts:signUp`, data, config)
    .then(response => response.data);
};
