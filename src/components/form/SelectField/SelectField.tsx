import React from 'react';

import RNPickerSelect, {
  Item,
  PickerSelectProps,
} from 'react-native-picker-select';

import { AppTheme } from '~/models/AppTheme ';

import TextField from '../TextField/TextField';

export interface SelectFieldProps extends Omit<PickerSelectProps, 'items'> {
  error?: string | boolean;
  touched?: boolean;
  theme?: AppTheme;
  selectorPlaceholder?: Item | {};
  placeholder?: string;
  options: PickerSelectProps['items'];
}

export const SelectField: React.FC<SelectFieldProps> = ({
  error,
  touched,
  value,
  placeholder,
  selectorPlaceholder,
  onValueChange,
  onClose,
  options,
  theme,
}) => {
  return (
    <RNPickerSelect
      placeholder={{
        label: selectorPlaceholder,
        value: '', // to override null and match Formik requirements
        color: 'gray',
      }}
      onValueChange={onValueChange}
      onClose={onClose} // imitating onBlur
      items={options}
    >
      <TextField
        value={value}
        placeholder={placeholder}
        error={error}
        touched={touched}
        theme={theme}
      />
    </RNPickerSelect>
  );
};
