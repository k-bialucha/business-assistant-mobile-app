import React from 'react';

import { AppTheme } from '~/models/AppTheme ';
import renderWithRedux from '~/utils/testing/renderWithRedux';

import TextField from './TextField';

describe('<TextField />', () => {
  it('should render error message if field touched and has invalid value ', async () => {
    const errorText = 'Required';
    const { getByTestId } = renderWithRedux(
      <TextField error={errorText} touched />
    );

    const expectedErrorText = getByTestId('errorMessage').children[0];

    expect(expectedErrorText).toBe(errorText);
  });

  it('should not render error message if field not touched', () => {
    const { queryByTestId } = renderWithRedux(<TextField error="Required" />);

    const expectedError = queryByTestId('errorMessage');

    expect(expectedError).toBeNull();
  });

  it('should render field with proper placeholder text color for light theme', () => {
    const { queryByTestId } = renderWithRedux(<TextField testID="field" />);
    const fieldLightThemeColor = 'rgba(26, 42, 64, 0.4)';

    const field = queryByTestId('field');

    expect(field?.props.placeholderTextColor).toBe(fieldLightThemeColor);
  });

  it('should render field with proper placeholder text color for dark theme', () => {
    const { queryByTestId } = renderWithRedux(
      <TextField testID="field" theme={AppTheme.DARK} />
    );
    const fieldDarkThemeColor = 'rgba(255, 255, 255, 0.6)';

    const field = queryByTestId('field');

    expect(field?.props.placeholderTextColor).toBe(fieldDarkThemeColor);
  });
});
