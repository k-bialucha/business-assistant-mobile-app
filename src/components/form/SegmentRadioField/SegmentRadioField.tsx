import React from 'react';

import { AppTheme } from '~/models/AppTheme ';
import Colors from '~/theme/Colors';

import {
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from './SegmentRadioField.styled';

export interface SegmentRadioFieldProps {
  touched?: boolean;
  theme?: AppTheme;
  value: any;
  onPress: (value: any) => void;
  setTouched: () => void;
  radioOptions: { label: string; value: React.ReactText }[];
  color: string;
}

export const SegmentRadioField: React.FC<SegmentRadioFieldProps> = ({
  onPress,
  setTouched,
  touched,
  theme,
  value,
  radioOptions,
  color,
}) => {
  return (
    <StyledView>
      {radioOptions.map((option, i) => {
        const isSelected = value === option.value;
        const activeBgColor =
          theme === AppTheme.DARK ? Colors.navyBlue : '#ffffff';

        return (
          <StyledTouchableOpacity
            key={i}
            style={{
              borderColor: isSelected ? color : Colors.silver,
              backgroundColor: isSelected ? activeBgColor : 'transparent',
            }}
            onPress={() => {
              if (value !== option.value) onPress(option.value);
              if (!touched) setTouched();
            }}
          >
            <StyledText
              style={{
                color: isSelected ? color : Colors.gray,
              }}
            >
              {option.label}
            </StyledText>
          </StyledTouchableOpacity>
        );
      })}
    </StyledView>
  );
};
