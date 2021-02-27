import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { AppTheme } from '~/models/AppTheme ';
import Colors from '~/theme/Colors';

interface SegmentRadioFieldProps {
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
    <View
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        paddingTop: 18,
        paddingBottom: 12,
      }}
    >
      {radioOptions.map((option, i) => {
        const isSelected = value === option.value;
        const activeBgColor =
          theme === AppTheme.DARK ? Colors.navyBlue : '#ffffff';

        return (
          <TouchableOpacity
            key={i}
            style={{
              display: 'flex',
              flex: 1,
              borderColor: isSelected ? color : Colors.silver,
              borderWidth: 3,
              backgroundColor: isSelected ? activeBgColor : 'transparent',
              alignItems: 'center',
              paddingTop: 8,
              paddingBottom: 8,
            }}
            onPress={() => {
              if (value !== option.value) onPress(option.value);
              if (!touched) setTouched();
            }}
          >
            <Text
              style={{
                fontSize: 18,
                letterSpacing: 0.6,
                color: isSelected ? color : Colors.gray,
              }}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
