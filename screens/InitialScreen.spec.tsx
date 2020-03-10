import React from 'react';
import { fireEvent } from 'react-native-testing-library';

import renderWithRedux from '../testingUtils/renderWithRedux';

import InitialScreen from './InitialScreen';

describe('<InitialScreen />', () => {
  const { queryByTestId, store } = renderWithRedux(<InitialScreen />);

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
