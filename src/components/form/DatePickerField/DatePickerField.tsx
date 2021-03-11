/**
 * INFO: @react-native-community/datetimepicker version for expo doesn't support
 * iOS 14, this is temporary Date Picker Field
 */

import React from 'react';
import { Text, View } from 'react-native';

import DateTimePicker, {
  DatePickerOptions,
} from '@react-native-community/datetimepicker';

import { AppTheme } from '~/models/AppTheme ';

import { ErrorMessage } from '../TextField/TextField.styled';

interface DatePickerFieldProps extends DatePickerOptions {
  theme?: AppTheme;
  placeholder: string;
  error?: string | boolean;
  touched?: boolean;
  onChange(date: any): void;
  setTouched(): void;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  placeholder,
  onChange,
  setTouched,
  touched,
  error,
  ...props
}) => {
  return (
    <View
      style={{
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontSize: 18,
            letterSpacing: 0.6,
            paddingLeft: 12,
            paddingBottom: 5,
          }}
        >
          {placeholder}:
        </Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <DateTimePicker
            {...props}
            onChange={(_, date) => {
              onChange(date);
              if (!touched) setTouched();
            }}
            style={{
              height: 38,
              width: 124,
            }}
          />
        </View>
      </View>
      {error && touched ? (
        <ErrorMessage testID="errorMessage">{error}</ErrorMessage>
      ) : null}
    </View>
  );
};
