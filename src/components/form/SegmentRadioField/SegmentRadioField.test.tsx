import React from 'react';

import renderWithRedux from '~/utils/testing/renderWithRedux';

import { SegmentRadioField, SegmentRadioFieldProps } from './SegmentRadioField';

describe('<SegmentRadioField />', () => {
  it('should render all segments basing on passed options', () => {
    const mockedProps: SegmentRadioFieldProps = {
      value: '',
      onPress: jest.fn(),
      setTouched: jest.fn(),
      color: '#ff0000',
      radioOptions: [
        { label: 'option1', value: '1' },
        { label: 'option2', value: '2' },
      ],
    };

    const root = renderWithRedux(<SegmentRadioField {...mockedProps} />);

    expect(root.queryByText(mockedProps.radioOptions[0].label)).not.toBeNull();
    expect(root.queryByText(mockedProps.radioOptions[1].label)).not.toBeNull();
  });

  it('should render with initially selected item', () => {
    const initialValue = '1';
    const primaryColor = '#ff0000';
    const mockedProps: SegmentRadioFieldProps = {
      value: initialValue,
      onPress: jest.fn(),
      setTouched: jest.fn(),
      color: primaryColor,
      radioOptions: [
        { label: 'option1', value: '1' },
        { label: 'option2', value: '2' },
      ],
    };

    const root = renderWithRedux(<SegmentRadioField {...mockedProps} />);
    const selectedOption = root.getByText(mockedProps.radioOptions[0].label);

    expect(selectedOption.parent?.props.style.color).toBe(primaryColor);
  });
});
