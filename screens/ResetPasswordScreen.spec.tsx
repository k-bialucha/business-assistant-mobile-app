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
  const { queryByTestId, queryByDisplayValue } = renderWithRedux(
    <ResetPasswordScreen {...fakeProps} />
  );

  const emailInput: ReactTestInstance = queryByTestId('email-input');
  const resetPasswordButton: ReactTestInstance = queryByTestId(
    'reset-password-button'
  );

  it('sets route `email` parameter as initial input value', () => {
    const maybeInputValue: ReactTestInstance = queryByDisplayValue(
      fakeProps.route.params.email
    );

    expect(maybeInputValue).not.toBeNull();
  });

  it('does not allow to send form with invalid email', async () => {
    const someInvalidEmail = 'some-invalid@email';

    await act(async () => {
      fireEvent.changeText(emailInput, someInvalidEmail);
    });

    expect(resetPasswordButton.props.disabled).toBe(true);
  });

  it('allows to send form with valid email', async () => {
    const someInvalidEmail = 'some-valid@email.com';

    await act(async () => {
      fireEvent.changeText(emailInput, someInvalidEmail);
    });

    expect(resetPasswordButton.props.disabled).toBe(false);
  });
});
