import React from 'react';

import { render } from '@testing-library/react-native';

import { AppTheme } from '~/models/AppTheme ';

import TextField from './TextField';

describe('<TextField />', () => {
  it('should render error message if field touched and has invalid value ', async () => {
    const expectedErrorText = 'Required';
    const { getByTestId } = render(
      <TextField error={expectedErrorText} touched />
    );

    const errorText = getByTestId('errorMessage').children[0];

    expect(errorText).toBe(expectedErrorText);
  });

  it('should not render error message if field not touched', () => {
    const { queryByTestId } = render(<TextField error="Required" />);

    const error = queryByTestId('errorMessage');

    expect(error).toBeNull();
  });

  it('should render field with proper placeholder text color for light theme', () => {
    const { queryByTestId } = render(<TextField testID="field" />);
    const fieldLightThemeColor = 'rgba(26, 42, 64, 0.4)';

    const field = queryByTestId('field');

    expect(field?.props.placeholderTextColor).toBe(fieldLightThemeColor);
  });

  it('should render field with proper placeholder text color for dark theme', () => {
    const { queryByTestId } = render(
      <TextField testID="field" theme={AppTheme.DARK} />
    );
    const fieldDarkThemeColor = 'rgba(255, 255, 255, 0.6)';

    const field = queryByTestId('field');

    expect(field?.props.placeholderTextColor).toBe(fieldDarkThemeColor);
  });
});
