import axios, { AxiosRequestConfig } from 'axios';

const firebaseApiKey = 'AIzaSyC-9qBqevcFydL7LJExJooU3EcTqnABx1w';

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
      key: firebaseApiKey,
    },
  };

  return firebaseAuth
    .post(`/accounts:signInWithPassword`, data, config)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
};

export const signupUser = (email: string, password: string, phone?: string) => {
  const data = {
    email,
    password,
    returnSecureToken: true,
  };
  const config: AxiosRequestConfig = {
    params: {
      key: firebaseApiKey,
    },
  };

  return firebaseAuth
    .post(`/accounts:signUp`, data, config)
    .then(response => response.data)
    .catch(error => {
      throw new Error(error);
    });
};
