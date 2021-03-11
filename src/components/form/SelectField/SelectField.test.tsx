import React from 'react';

import renderWithRedux from '~/utils/testing/renderWithRedux';

import { SelectField, SelectFieldProps } from './SelectField';

describe('<SelectField />', () => {
  const mockedProps: SelectFieldProps = {
    items: [
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
    const root = renderWithRedux(<SelectField {...mockedProps} />);

    expect(root.getByTestId('textField')).toBeDefined();
  });
});
