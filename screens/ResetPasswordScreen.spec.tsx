import '@testing-library/jest-native/extend-expect';

import React from 'react';

import { act, fireEvent } from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';

import { NavigationData } from '../navigation/AuthNavigator';
import renderWithRedux from '../utils/testing/renderWithRedux';

import ResetPasswordScreen from './ResetPasswordScreen';

type Props = NavigationData<'ResetPassword'>;

const fakeProps: Props = {
  route: {
    key: '1234',
    name: 'ResetPassword',
    params: { email: 'email@some.com' },
  },
  // @ts-ignore
  navigation: {},
};

describe('<ResetPasswordScreen />', () => {
  const { queryByTestId, store } = renderWithRedux(
    <ResetPasswordScreen {...fakeProps} />
  );

  const emailInput: ReactTestInstance = queryByTestId('email-input');
  const resetPasswordButton: ReactTestInstance = queryByTestId(
    'reset-password-button'
  );

  it('allows to sent reset password form', async () => {
    const someEmail = 'siatkasebastian@gmail.com';

    fireEvent.changeText(emailInput, someEmail);

    await act(async () => {
      fireEvent.press(resetPasswordButton);
    });

    process.nextTick(() => {
      // TODO: what can we check here? Redux state won't be changed after this action
      // expect(store.getState().auth.username).toBe(someEmail);
    });
  });
});
