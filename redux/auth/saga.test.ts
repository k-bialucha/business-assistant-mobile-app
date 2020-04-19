import { put } from 'redux-saga/effects';

import { loginSaga } from './saga';
import { DOMAIN_NAME, LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS } from './types';

describe(`${DOMAIN_NAME}/saga`, () => {
  it('handles successful login', () => {
    const someApiResponse = {
      idToken: 'token-123',
      localId: '12345',
    };
    const generator = loginSaga({
      type: LOGIN,
      payload: { username: 'some-username', password: 'strong-password' },
    });

    const delayDescriptor = generator.next().value;
    const apiCallDescriptor = generator.next().value;
    const putDescriptor = generator.next(someApiResponse).value;

    expect(delayDescriptor).toMatchSnapshot();
    expect(apiCallDescriptor).toMatchSnapshot();
    expect(putDescriptor).toEqual(
      put({
        type: LOGIN_SUCCESS,
        payload: { token: expect.any(String), userId: expect.any(String) },
      })
    );
    expect(generator.next().done).toBe(true);
  });

  it('handles unsuccessful login', () => {
    const someError = new Error('Bad Credentials');
    const generator = loginSaga({
      type: LOGIN,
      payload: { username: 'some-username', password: 'pass' },
    });

    const delayDescriptor = generator.next().value;

    const apiCallDescriptor = generator.next().value;

    const putDescriptor = generator.throw(someError).value;

    expect(delayDescriptor).toMatchSnapshot();
    expect(apiCallDescriptor).toMatchSnapshot();
    expect(putDescriptor).toEqual(
      put({ type: LOGIN_FAILURE, payload: someError.message })
    );
    expect(generator.next().done).toBe(true);
  });
});
