import '@testing-library/jest-native/extend-expect';

import React from 'react';
import { Alert } from 'react-native';

import { act, fireEvent } from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';

import { NavigationData } from '~/navigation/AuthNavigator';
import renderWithRedux from '~/utils/testing/renderWithRedux';

import ResetPasswordScreen from './ResetPasswordScreen';

jest.unmock('react-redux');
// should it be moved into separated module?
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  return Object.setPrototypeOf(
    {
      Alert: {
        ...RN.Alert,
        alert: jest.fn(),
      },
    },
    RN
  );
});

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
  const {
    getByTestId,
    queryByText,
    queryByTestId,
    queryByDisplayValue,
  } = renderWithRedux(<ResetPasswordScreen {...fakeProps} />);

  const emailInput: ReactTestInstance = getByTestId('email-input');
  const resetPasswordButton: ReactTestInstance = getByTestId(
    'reset-password-button'
  );

  it('sets route `email` parameter as initial input value', () => {
    const maybeInputValue: ReactTestInstance | null = queryByDisplayValue(
      fakeProps.route.params.email
    );

    expect(maybeInputValue).not.toBeNull();
  });

  it('shows the validation message in case of empty email', async () => {
    await act(async () => {
      fireEvent.changeText(emailInput, '');
    });

    await act(async () => {
      fireEvent.press(resetPasswordButton);
    });

    const validationText: ReactTestInstance | null = queryByTestId(
      'errorMessage'
    );

    expect(validationText).toBeTruthy();
  });

  it('allows to send form with valid email', async () => {
    const someEmail = 'some-valid@email.com';

    await act(async () => {
      fireEvent.changeText(emailInput, someEmail);
    });
    await act(async () => {
      fireEvent.press(resetPasswordButton);
    });

    const validationText: ReactTestInstance | null = queryByText(
      'Invalid Email'
    );

    expect(validationText).toBeNull();
  });

  it('shows the alert with a message if form has submitted successfully', async () => {
    const someInvalidEmail = 'some-valid@email.com';

    await act(async () => {
      fireEvent.changeText(emailInput, someInvalidEmail);
    });
    await act(async () => {
      fireEvent.press(resetPasswordButton);
    });

    expect(Alert.alert).toHaveBeenCalled();
  });
});
