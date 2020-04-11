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
  const { queryByTestId, store } = renderWithRedux(
    <LoginScreen {...fakeProps} />
  );

  let usernameInput: ReactTestInstance;
  let passwordInput: ReactTestInstance;
  let loginButton: ReactTestInstance;
  let logoutButton: ReactTestInstance;

  it('allows to login', async () => {
    usernameInput = queryByTestId('username-input');
    passwordInput = queryByTestId('password-input');
    loginButton = queryByTestId('login-button');

    fireEvent.changeText(usernameInput, 'admin');
    fireEvent.changeText(passwordInput, 'admin1');

    fireEvent.press(loginButton);

    logoutButton = queryByTestId('logout-button');

    expect(logoutButton).not.toBeNull();
    expect(store.getState().auth.token).toBeDefined();
    expect(store.getState().auth.username).toBe('admin');
  });

  it('allows to logout', () => {
    fireEvent.press(logoutButton);

    logoutButton = queryByTestId('logout-button');
    loginButton = queryByTestId('login-button');

    expect(store.getState().auth.username).toBe(null);
    expect(logoutButton).toBeNull();
    expect(loginButton).not.toBeNull();
  });

  it('allows to login again', () => {
    usernameInput = queryByTestId('username-input');
    passwordInput = queryByTestId('password-input');

    fireEvent.changeText(usernameInput, 'different-user');
    fireEvent.changeText(passwordInput, 'admin123');

    fireEvent.press(loginButton);

    logoutButton = queryByTestId('logout-button');
    loginButton = queryByTestId('login-button');

    expect(logoutButton).not.toBeNull();
    expect(loginButton).toBeNull();
    expect(store.getState().auth.token).toBeDefined();
    expect(store.getState().auth.username).toBe('different-user');
  });

  it('shows success info when logged in', () => {
    const successSign = queryByTestId('status-message');

    expect(successSign).toHaveTextContent('SUCCESS');
  });
});
