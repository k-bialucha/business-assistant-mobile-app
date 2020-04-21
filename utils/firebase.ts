import * as firebase from 'firebase';

// TODO: move to .env file
const options = {
  apiKey: 'AIzaSyC-9qBqevcFydL7LJExJooU3EcTqnABx1w',
  authDomain: 'personal-business-assistance.firebaseapp.com',
  databaseURL: 'https://personal-business-assistance.firebaseio.com',
  projectId: 'personal-business-assistance',
  storageBucket: 'gs://personal-business-assistance.appspot.com',
  messagingSenderId: '1075933789993',
};

firebase.initializeApp(options);

export default firebase;
