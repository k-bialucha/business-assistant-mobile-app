import React, { useState } from 'react';
import { Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../redux/rootReducer';
import { AuthState } from '../redux/auth/reducer';

import {
  StyledView,
  StyledText,
  StyledInput,
  StyledInputContainer,
  StyledButtonsContainer,
} from './InitialScreen.styled';
import { login, logout } from '../redux/auth';

const InitialScreen: React.FC<{}> = () => {
  const [username, setUsername] = useState<string>('');

  const authState: AuthState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <StyledView>
      <StyledText success={authState.token}>
        State: {authState.token ? 'Authenticated' : 'Unauthenticated'}
      </StyledText>
      <StyledText>
        Username: {authState.username ? authState.username : '?'}
      </StyledText>
      <StyledInputContainer>
        <StyledInput value={username} onChangeText={setUsername} />
      </StyledInputContainer>
      <StyledButtonsContainer>
        <Button
          title="Login"
          disabled={!!authState.username}
          onPress={() => {
            dispatch(login(username));
          }}
        />
        <Button
          title="Logout"
          disabled={!authState.username}
          onPress={() => {
            setUsername('');
            dispatch(logout());
          }}
        />
      </StyledButtonsContainer>
    </StyledView>
  );
};

export default InitialScreen;
