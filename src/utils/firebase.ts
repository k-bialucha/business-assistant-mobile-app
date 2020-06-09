import * as firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';

import {
  AUTH_DOMAIN,
  DATABASE_URL,
  FIREBASE_API_KEY,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from '~env';

const options = {
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
};

const app = firebase.initializeApp(options);

export const myFirebaseApp = new ReduxSagaFirebase(app);

export default firebase;
