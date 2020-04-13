import React from 'react';
import { TextInputProps } from 'react-native';

import { StyledContainer, StyledTextField } from './TextField.styled';

const TextField: React.SFC<TextInputProps> = props => {
  return (
    <StyledContainer>
      <StyledTextField
        {...props}
        placeholderTextColor="rgba(255,255,255, 0.6)"
      />
    </StyledContainer>
  );
};

export default TextField;
