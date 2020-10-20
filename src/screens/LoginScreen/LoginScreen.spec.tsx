import '@testing-library/jest-native/extend-expect';

import React from 'react';

import { act, fireEvent } from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';

import { NavigationData } from '~/navigation/AuthNavigator';
import { loginUser } from '~/utils/apiCalls/authorization';
import renderWithRedux from '~/utils/testing/renderWithRedux';

import LoginScreen from './LoginScreen';

jest.unmock('react-redux');

type Props = NavigationData<'Login'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'Login' },
  // @ts-ignore
  navigation: {},
};

jest.mock('~/utils/apiCalls/authorization');
jest.mock('redux-saga/effects', () => {
  const actualModule = jest.requireActual('redux-saga/effects');

  return {
    __esModule: true,
    ...actualModule,
    // TODO: find a way how not to mock
    delay: () => () => true,
  };
});

const someApiResponse = { idToken: 'highly-secure-token', localId: '999abcd' };

describe('<LoginScreen />', () => {
  beforeEach(() => {
    (loginUser as jest.Mock).mockResolvedValue(someApiResponse);
  });

  const { getByTestId, store } = renderWithRedux(
    <LoginScreen {...fakeProps} />
  );

  const emailInput: ReactTestInstance = getByTestId('email-input');
  const passwordInput: ReactTestInstance = getByTestId('password-input');
  const loginButton: ReactTestInstance = getByTestId('login-button');

  it('allows to login', async () => {
    const someEmail = 'kamil.bialucha@gmail.com';

    fireEvent.changeText(emailInput, someEmail);

    fireEvent.changeText(passwordInput, 'mypass123');

    await act(async () => {
      fireEvent.press(loginButton);
    });

    process.nextTick(() => {
      expect(store.getState().auth.username).toBe(someEmail);
      expect(store.getState().auth.token).toEqual(someApiResponse.idToken);
      expect(store.getState().auth.userId).toBe(someApiResponse.localId);
    });
  });
});
