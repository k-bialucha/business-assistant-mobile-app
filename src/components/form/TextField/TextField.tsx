import React from 'react';
import { TextInputProps } from 'react-native';

import {
  ErrorMessage,
  StyledContainer,
  StyledTextField,
} from './TextField.styled';

interface TextFieldProps extends TextInputProps {
  error?: string | boolean;
  touched?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({ error, touched, ...props }) => {
  return (
    <StyledContainer>
      <StyledTextField
        {...props}
        valid={!(error && touched)}
        placeholderTextColor="rgba(255,255,255, 0.6)"
      />
      {error && touched ? (
        <ErrorMessage testID="errorMessage">{error}</ErrorMessage>
      ) : null}
    </StyledContainer>
  );
};

export default TextField;
