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

describe('<AuthScreen />', () => {
  const { queryByTestId, store } = renderWithRedux(
    <AuthScreen {...fakeProps} />
  );

  const usernameInput = queryByTestId('username-input');
  const loginButton = queryByTestId('login-button');
  const logoutButton = queryByTestId('logout-button');

  it('allows to login', () => {
    fireEvent.changeText(usernameInput, 'admin');
    fireEvent.press(loginButton);

    expect(store.getState().auth.username).toBe('admin');
  });

  it('allows to logout', () => {
    expect(store.getState().auth.username).toBe('admin');

    fireEvent.press(logoutButton);

    expect(store.getState().auth.username).toBe(null);
  });

  it('allows to login again', () => {
    fireEvent.changeText(usernameInput, 'different-user');
    fireEvent.press(loginButton);

    expect(store.getState().auth.username).toBe('different-user');
  });
});
