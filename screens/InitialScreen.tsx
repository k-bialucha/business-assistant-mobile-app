import React from 'react';
import { useSelector } from 'react-redux';

import { StyledView, StyledText } from './InitialScreen.styled';

const InitialScreen: React.FC<{}> = () => {
  const authState = useSelector(state => state.auth);

  return (
    <StyledView>
      <StyledText>Token: {authState.token}</StyledText>
    </StyledView>
  );
};

export default InitialScreen;
