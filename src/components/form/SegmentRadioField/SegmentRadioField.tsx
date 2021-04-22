import React from 'react';

import { AppTheme } from '~/models/AppTheme ';

import {
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from './SegmentRadioField.styled';

export interface SegmentRadioFieldProps<T extends boolean | number | string> {
  touched?: boolean;
  theme?: AppTheme;
  value: T;
  onPress(value: T): void;
  setTouched(): void;
  radioOptions: { label: string; value: T }[];
  color: string;
}

export const SegmentRadioField = <T extends boolean | number | string>({
  onPress,
  setTouched,
  touched,
  theme,
  value,
  radioOptions,
  color,
}: SegmentRadioFieldProps<T>): JSX.Element => {
  return (
    <StyledView>
      {radioOptions.map((option, i) => {
        const isSelected = value === option.value;

        return (
          <StyledTouchableOpacity
            key={i}
            isSelected={isSelected}
            color={color}
            theme={theme}
            onPress={() => {
              if (value !== option.value) onPress(option.value);
              if (!touched) setTouched();
            }}
          >
            <StyledText isSelected={isSelected} color={color}>
              {option.label}
            </StyledText>
          </StyledTouchableOpacity>
        );
      })}
    </StyledView>
  );
};
