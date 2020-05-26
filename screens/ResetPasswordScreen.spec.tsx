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
  const { queryByTestId, queryByDisplayValue, queryByText } = renderWithRedux(
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

  it('shows the validation message in case of invalid email', async () => {
    // validation message shows only after pressing outside the text input
    // trigger showing validation by pressing a button
    await act(async () => {
      fireEvent.press(resetPasswordButton);
    });

    const validationText: ReactTestInstance = queryByText('Invalid email');

    expect(validationText).not.toBeNull();
  });

  it('shows the validation message in case of empty email', async () => {
    await act(async () => {
      fireEvent.changeText(emailInput, '');
    });

    const validationText: ReactTestInstance = queryByText('Required');

    expect(validationText).not.toBeNull();
  });

  it('allows to send form with valid email', async () => {
    const someInvalidEmail = 'some-valid@email.com';

    await act(async () => {
      fireEvent.changeText(emailInput, someInvalidEmail);
    });

    expect(resetPasswordButton.props.disabled).toBe(false);
  });
});
