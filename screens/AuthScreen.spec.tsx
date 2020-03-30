import React from 'react';

import { fireEvent } from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';

import { NavigationData } from '../navigation/AuthNavigator';
import renderWithRedux from '../utils/testing/renderWithRedux';

import AuthScreen from './AuthScreen';

type Props = NavigationData<'Authorization'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'Authorization' },
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

describe('<AuthScreen />', () => {
  const { queryByTestId, store } = renderWithRedux(
    <AuthScreen {...fakeProps} />
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

    expect(logoutButton).toBeDefined();
    expect(store.getState().auth.token).toBeDefined();
    expect(store.getState().auth.username).toBe('admin');
  });

  it('allows to logout', () => {
    fireEvent.press(logoutButton);

    logoutButton = queryByTestId('logout-button');
    loginButton = queryByTestId('login-button');

    expect(store.getState().auth.username).toBe(null);
    expect(logoutButton).toBeNull();
    expect(loginButton).toBeDefined();
  });

  it('allows to login again', () => {
    usernameInput = queryByTestId('username-input');
    passwordInput = queryByTestId('password-input');

    fireEvent.changeText(usernameInput, 'different-user');
    fireEvent.changeText(passwordInput, 'admin123');

    fireEvent.press(loginButton);

    expect(logoutButton).toBeDefined();
    expect(store.getState().auth.token).toBeDefined();
    expect(store.getState().auth.username).toBe('different-user');
  });
});
