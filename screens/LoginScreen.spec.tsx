import '@testing-library/jest-native/extend-expect';

import React from 'react';

import { fireEvent } from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';

import { NavigationData } from '../navigation/AuthNavigator';
import renderWithRedux from '../utils/testing/renderWithRedux';

import LoginScreen from './LoginScreen';

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

describe('<LoginScreen />', () => {
  // (loginUser as jest.Mock).mockResolvedValue({
  //   idToken: 'token-123',
  //   localId: '12345',
  // });
  const { queryByTestId, store } = renderWithRedux(
    <LoginScreen {...fakeProps} />
  );

  let usernameInput: ReactTestInstance;
  let passwordInput: ReactTestInstance;
  let loginButton: ReactTestInstance;
  // let logoutButton: ReactTestInstance;

  it('allows to login', async () => {
    usernameInput = queryByTestId('username-input');
    passwordInput = queryByTestId('password-input');
    loginButton = queryByTestId('login-button');

    fireEvent.changeText(usernameInput, 'kamil.bialucha@gmail.com');
    fireEvent.changeText(passwordInput, 'mypass123');

    fireEvent.press(loginButton);

    // logoutButton = queryByTestId('logout-button');

    // expect(logoutButton).not.toBeNull();
    expect(store.getState().auth.token).toBeDefined();
    expect(store.getState().auth.username).toBe('admin');
  });
});
