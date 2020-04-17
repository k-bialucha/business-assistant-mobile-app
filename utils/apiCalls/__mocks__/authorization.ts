export const loginUser = () => {
  return new Promise(resolve =>
    resolve({
      idToken: 'token-123',
      localId: '12345',
    })
  );
};

export const signupUser = () => {
  return new Promise(resolve => resolve('TODO!'));
};
