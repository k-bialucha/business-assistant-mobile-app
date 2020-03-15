import React, { useState } from 'react';
import { Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../redux/rootReducer';
import { AuthState } from '../redux/auth/reducer';
import { login, logout } from '../redux/auth';

import {
  StyledView,
  StyledText,
  StyledInput,
  StyledInputContainer,
  StyledButtonsContainer,
} from './InitialScreen.styled';

const InitialScreen: React.FC<{}> = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
        <StyledInput
          testID="username-input"
          value={username}
          placeholder="username"
          onChangeText={setUsername}
        />
      </StyledInputContainer>
      <StyledInputContainer>
        <StyledInput
          testID="password-input"
          value={password}
          placeholder="password"
          onChangeText={setPassword}
          secureTextEntry
        />
      </StyledInputContainer>
      <StyledButtonsContainer>
        <Button
          testID="login-button"
          title="Login"
          disabled={!!authState.token}
          onPress={() => {
            dispatch(login(username, password));
          }}
        />
        <Button
          testID="logout-button"
          title="Logout"
          disabled={!authState.token}
          onPress={() => {
            setUsername('');
            setPassword('');
            dispatch(logout());
          }}
        />
      </StyledButtonsContainer>
    </StyledView>
  );
};

export default InitialScreen;
