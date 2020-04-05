import { delay, put } from 'redux-saga/effects';

import { loginSaga } from './saga';
import { DOMAIN_NAME, LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS } from './types';

describe(`${DOMAIN_NAME}/reducer`, () => {
  it('handles successful login', () => {
    const generator = loginSaga({
      type: LOGIN,
      payload: { username: 'some-username', password: 'strong-password' },
    });

    const delayDescriptor = generator.next().value;

    expect(delayDescriptor).toEqual(delay(1000));

    const putDescriptor = generator.next().value;

    expect(putDescriptor).toEqual(
      put({ type: LOGIN_SUCCESS, payload: expect.any(String) })
    );
  });

  it('handles unsuccessful login', () => {
    const generator = loginSaga({
      type: LOGIN,
      payload: { username: 'some-username', password: 'pass' },
    });

    const delayDescriptor = generator.next().value;

    expect(delayDescriptor).toEqual(delay(1000));

    const putDescriptor = generator.next().value;

    expect(putDescriptor).toEqual(
      put({ type: LOGIN_FAILURE, payload: expect.any(String) })
    );
  });
});
