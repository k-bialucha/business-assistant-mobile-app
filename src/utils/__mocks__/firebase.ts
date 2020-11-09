export const someLoginApiResponse = {
  user: {
    uid: 'mocked-uid',
    displayName: 'mocked-display-name',
    photoURL: 'http://mocked-url',
  },
};

export const someSignupApiResponse = {
  user: {
    uid: 'mocked-user-uid',
    email: 'some@email.com',
  },
};

const firebaseMock: { auth: any; initializeApp: Function } = {
  auth: jest.fn(() => ({
    createUserWithEmailAndPassword: jest
      .fn()
      .mockResolvedValue(someSignupApiResponse),
    signInWithEmailAndPassword: jest
      .fn()
      .mockResolvedValue(someLoginApiResponse),
    signInWithCredential: jest.fn().mockResolvedValue(someLoginApiResponse),
    sendPasswordResetEmail: jest.fn(),
  })),
  initializeApp: jest.fn(),
};

firebaseMock.auth.FacebookAuthProvider = { credential: jest.fn() };

firebaseMock.auth.GoogleAuthProvider = { credential: jest.fn() };

export const initializeApp = jest.fn();

export default firebaseMock;

/*
SECOND CASE TO MOCK

import * as firebase from 'firebase';

jest.spyOn(firebase, 'auth').mockImplementation(() => {
  return {
    createUserWithEmailAndPassword: jest
      .fn()
      .mockResolvedValue(someSignupApiResponse),
    signInWithEmailAndPassword: jest
      .fn()
      .mockResolvedValue(someLoginApiResponse),
    signInWithCredential: jest.fn().mockResolvedValue(someFbLoginApiResponse),
  };
});

firebase.auth.FacebookAuthProvider = {
  credential: jest.fn(),
};

export default firebase;
*/
