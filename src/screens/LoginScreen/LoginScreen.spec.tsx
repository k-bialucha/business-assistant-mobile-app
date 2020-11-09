import '@testing-library/jest-native/extend-expect';

import React from 'react';

import { act, fireEvent } from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';

import { NavigationData } from '~/navigation/AuthNavigator';
import { someLoginApiResponse } from '~/utils/__mocks__/firebase';
import renderWithRedux from '~/utils/testing/renderWithRedux';

import LoginScreen from './LoginScreen';

jest.unmock('react-redux');

type Props = NavigationData<'Login'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'Login' },
  // @ts-ignore
  navigation: {},
};

jest.mock('redux-saga/effects', () => {
  const actualModule = jest.requireActual('redux-saga/effects');

  return {
    __esModule: true,
    ...actualModule,
    // TODO: find a way how not to mock
    delay: () => () => true,
  };
});
jest.mock('~/utils/firebase');

describe('<LoginScreen />', () => {
  // beforeEach(() => {
  //   (login as jest.Mock).mockResolvedValue(someApiResponse);
  // });

  const { getByTestId, store } = renderWithRedux(
    <LoginScreen {...fakeProps} />
  );

  const emailInput: ReactTestInstance = getByTestId('email-input');
  const passwordInput: ReactTestInstance = getByTestId('password-input');
  const loginButton: ReactTestInstance = getByTestId('login-button');

  it('allows to login', async () => {
    const someEmail = 'some@email.com';
    const somePassword = 'mypass123';

    fireEvent.changeText(emailInput, someEmail);

    fireEvent.changeText(passwordInput, somePassword);

    await act(async () => {
      fireEvent.press(loginButton);
    });

    process.nextTick(() => {
      expect(store.getState().auth.username).toBe(
        someLoginApiResponse.user.displayName
      );
      expect(store.getState().auth.isAuthenticated).toBe(true);
      expect(store.getState().auth.userId).toBe(someLoginApiResponse.user.uid);
    });
  });
});
