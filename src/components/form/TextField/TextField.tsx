import React from 'react';
import { TextInputProps } from 'react-native';

import { AppTheme } from '~/models/AppTheme ';

import {
  ErrorMessage,
  StyledContainer,
  StyledTextField,
} from './TextField.styled';

interface TextFieldProps extends TextInputProps {
  error?: string | boolean;
  touched?: boolean;
  theme?: AppTheme;
}

const TextField: React.FC<TextFieldProps> = ({
  error,
  touched,
  theme = AppTheme.LIGHT,
  ...props
}) => {
  return (
    <StyledContainer testID="textField">
      <StyledTextField
        {...props}
        theme={theme}
        valid={!(error && touched)}
        placeholderTextColor={
          theme === AppTheme.LIGHT
            ? 'rgba(26, 42, 64, 0.4)'
            : 'rgba(255, 255, 255, 0.6)'
        }
      />
      {error && touched ? (
        <ErrorMessage testID="errorMessage">{error}</ErrorMessage>
      ) : null}
    </StyledContainer>
  );
};

export default TextField;
