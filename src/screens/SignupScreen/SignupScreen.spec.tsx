import '@testing-library/jest-native/extend-expect';

import React from 'react';

import { act, fireEvent } from '@testing-library/react-native';
import { ReactTestInstance } from 'react-test-renderer';

import { NavigationData } from '~/navigation/AuthNavigator';
import renderWithRedux from '~/utils/testing/renderWithRedux';

import SignupScreen from './SignupScreen';

jest.unmock('react-redux');

type Props = NavigationData<'Signup'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'Signup' },
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

describe('<SignupScreen />', () => {
  const { getByTestId, store } = renderWithRedux(
    <SignupScreen {...fakeProps} />
  );

  const emailInput: ReactTestInstance = getByTestId('email-input');
  const passwordInput: ReactTestInstance = getByTestId('password-input');
  const signupButton: ReactTestInstance = getByTestId('signup-button');

  it('allows to sign up', async () => {
    const someEmail = 'some@email.com';
    const somePassword = 'mypass123';
    const someUid = 'mocked-user-uid';

    fireEvent.changeText(emailInput, someEmail);

    fireEvent.changeText(passwordInput, somePassword);

    await act(async () => {
      fireEvent.press(signupButton);
    });

    process.nextTick(() => {
      expect(store.getState().auth.username).toBe(someEmail);
      expect(store.getState().auth.isAuthenticated).toBe(true);
      expect(store.getState().auth.userId).toBe(someUid);
    });
  });
});
