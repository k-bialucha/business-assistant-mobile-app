import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../redux/rootReducer';
import { AuthState } from '../redux/auth/reducer';

import { StyledView, StyledText } from './InitialScreen.styled';

const InitialScreen: React.FC<{}> = () => {
  const authState: AuthState = useSelector((state: RootState) => state.auth);

  return (
    <StyledView>
      <StyledText>Token: {authState.token}</StyledText>
    </StyledView>
  );
};

export default InitialScreen;
