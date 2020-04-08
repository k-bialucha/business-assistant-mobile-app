const firebaseApiKey = 'AIzaSyC-9qBqevcFydL7LJExJooU3EcTqnABx1w';

export const loginUser = (email, password) => {
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  ).then(data =>
    data.json().catch(error => {
      // TODO: method which throw different error based on request status
      throw new Error(error);
    })
  );
};
