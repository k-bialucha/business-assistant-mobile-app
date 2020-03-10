import React from 'react';
import { fireEvent } from 'react-native-testing-library';

import renderWithRedux from '../testingUtils/renderWithRedux';

import InitialScreen from './InitialScreen';

describe('<InitialScreen />', () => {
  it('allows to login', () => {
    const { queryByTestId, store } = renderWithRedux(<InitialScreen />);

    const usernameInput = queryByTestId('username-input');
    const loginButton = queryByTestId('login-button');

    fireEvent.changeText(usernameInput, 'admin');
    fireEvent.press(loginButton);

    expect(store.getState().auth.username).toBe('admin');
  });
});
