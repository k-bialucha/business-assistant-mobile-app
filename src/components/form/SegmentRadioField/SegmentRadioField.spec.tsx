import React from 'react';

import renderWithRedux, { fireEvent } from '~/utils/testing/renderWithRedux';

import { SegmentRadioField, SegmentRadioFieldProps } from './SegmentRadioField';

describe('<SegmentRadioField />', () => {
  it('should call onPress function on the segment click', () => {
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

    fireEvent.press(root.getByText(mockedProps.radioOptions[0].label));

    expect(mockedProps.onPress).toBeCalledTimes(1);
  });

  it('should not call onPress action if already selected segment has clicked', () => {
    const initialValue = '1';
    const mockedProps: SegmentRadioFieldProps = {
      value: initialValue,
      onPress: jest.fn(),
      setTouched: jest.fn(),
      color: '#ff0000',
      radioOptions: [
        { label: 'option1', value: '1' },
        { label: 'option2', value: '2' },
      ],
    };

    const root = renderWithRedux(<SegmentRadioField {...mockedProps} />);

    fireEvent.press(root.getByText(mockedProps.radioOptions[0].label));

    expect(mockedProps.onPress).toBeCalledTimes(0);
  });
});
