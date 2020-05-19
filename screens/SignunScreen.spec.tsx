import '@testing-library/jest-native/extend-expect';

import React from 'react';

import { act, fireEvent } from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';

import { NavigationData } from '../navigation/AuthNavigator';
import { signupUser } from '../utils/apiCalls/authorization';
import renderWithRedux from '../utils/testing/renderWithRedux';

import SignupScreen from './SignupScreen';

type Props = NavigationData<'Signup'>;

const fakeProps: Props = {
  route: { key: '1234', name: 'Signup' },
  // @ts-ignore
  navigation: {},
};

jest.mock('../utils/apiCalls/authorization');
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

describe('<SignupScreen />', () => {
  beforeEach(() => {
    (signupUser as jest.Mock).mockResolvedValue(someApiResponse);
  });

  const { queryByTestId, store } = renderWithRedux(
    <SignupScreen {...fakeProps} />
  );

  const emailInput: ReactTestInstance = queryByTestId('email-input');
  //   const phoneInput: ReactTestInstance = queryByTestId('phone-input');
  const passwordInput: ReactTestInstance = queryByTestId('password-input');
  const signupButton: ReactTestInstance = queryByTestId('signup-button');

  it('allows to sign up', async () => {
    const someEmail = 'siatkasebastian@gmail.com';

    fireEvent.changeText(emailInput, someEmail);

    // fireEvent.changeText(phoneInput, '');

    fireEvent.changeText(passwordInput, 'mypass123');

    await act(async () => {
      fireEvent.press(signupButton);
    });

    process.nextTick(() => {
      expect(store.getState().auth.username).toBe(someEmail);
      expect(store.getState().auth.token).toEqual(someApiResponse.idToken);
      expect(store.getState().auth.userId).toBe(someApiResponse.localId);
    });
  });
});
