import React from 'react';

import { fireEvent } from 'react-native-testing-library';

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

  it('allows to login', async () => {
    const usernameInput = queryByTestId('username-input');
    const passwordInput = queryByTestId('password-input');
    const loginButton = queryByTestId('login-button');

    fireEvent.changeText(usernameInput, 'admin');
    fireEvent.changeText(passwordInput, 'admin1');

    fireEvent.press(loginButton);

    expect(store.getState().auth.token).toBeDefined();
    expect(store.getState().auth.username).toBe('admin');
  });

  it('allows to logout', () => {
    const logoutButton = queryByTestId('logout-button');

    expect(store.getState().auth.username).toBe('admin');

    fireEvent.press(logoutButton);

    expect(store.getState().auth.username).toBe(null);
  });

  it('allows to login again', () => {
    const usernameInput = queryByTestId('username-input');
    const passwordInput = queryByTestId('password-input');
    const loginButton = queryByTestId('login-button');

    fireEvent.changeText(usernameInput, 'different-user');
    fireEvent.changeText(passwordInput, 'admin123');

    fireEvent.press(loginButton);

    expect(store.getState().auth.token).toBeDefined();
    expect(store.getState().auth.username).toBe('different-user');
  });
});
