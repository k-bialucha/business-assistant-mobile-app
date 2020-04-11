import React from 'react';

import { StyledContainer, StyledTextField } from './TextField.styled';

const TextField = props => {
  return (
    <StyledContainer>
      <StyledTextField {...props} />
    </StyledContainer>
  );
};

export default TextField;
