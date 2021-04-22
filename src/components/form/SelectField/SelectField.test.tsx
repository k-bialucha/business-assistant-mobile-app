import React from 'react';

import { render } from '@testing-library/react-native';

import { SelectField, SelectFieldProps } from './SelectField';

describe('<SelectField />', () => {
  const mockedProps: SelectFieldProps = {
    options: [
      {
        label: 'label',
        value: 'value',
      },
    ],
    onValueChange: jest.fn(),
    onClose: jest.fn(),
    selectorPlaceholder: 'selector-placeholder',
    placeholder: 'placeholder',
    value: '',
  };

  it('should render SelectField with TextField inside', () => {
    const root = render(<SelectField {...mockedProps} />);

    expect(root.getByTestId('textField')).toBeDefined();
  });
});
