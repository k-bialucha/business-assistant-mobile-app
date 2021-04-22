import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { SegmentRadioField, SegmentRadioFieldProps } from './SegmentRadioField';

const primaryColor = '#ff0000';
const commonMockedProps: SegmentRadioFieldProps<string> = {
  value: '',
  onPress: jest.fn(),
  setTouched: jest.fn(),
  color: primaryColor,
  radioOptions: [
    { label: 'option1', value: '1' },
    { label: 'option2', value: '2' },
  ],
};

describe('<SegmentRadioField />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render all segments basing on passed options', () => {
    const { queryByText } = render(
      <SegmentRadioField {...commonMockedProps} />
    );

    expect(queryByText(commonMockedProps.radioOptions[0].label)).not.toBeNull();
    expect(queryByText(commonMockedProps.radioOptions[1].label)).not.toBeNull();
  });

  it('should render with initially selected item', () => {
    const initialValue = '1';
    const mockedProps: SegmentRadioFieldProps<string> = {
      ...commonMockedProps,
      value: initialValue,
    };

    const root = render(<SegmentRadioField {...mockedProps} />);
    const selectedOption = root.getByText(mockedProps.radioOptions[0].label);

    expect(selectedOption.parent?.props.style.color).toBe(primaryColor);
  });

  it('should call onPress function on the segment click', () => {
    const root = render(<SegmentRadioField {...commonMockedProps} />);

    fireEvent.press(root.getByText(commonMockedProps.radioOptions[0].label));

    expect(commonMockedProps.onPress).toBeCalledTimes(1);
  });

  it('should not call onPress action if already selected segment has clicked', () => {
    const initialValue = '1';
    const mockedProps: SegmentRadioFieldProps<string> = {
      ...commonMockedProps,
      value: initialValue,
    };

    const root = render(<SegmentRadioField {...mockedProps} />);

    fireEvent.press(root.getByText(mockedProps.radioOptions[0].label));

    expect(mockedProps.onPress).toBeCalledTimes(0);
  });
});
