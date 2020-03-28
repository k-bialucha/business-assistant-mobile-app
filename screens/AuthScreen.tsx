import React, { useState } from 'react';
import { Button } from 'react-native';

import { StackNavigationOptions } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationData } from '../navigation/AuthNavigator';
import { login, LoginRequestStatus, logout } from '../redux/auth';
import { RootState } from '../redux/rootReducer';

import {
  StyledButtonsContainer,
  StyledInput,
  StyledInputContainer,
  StyledText,
  StyledView,
} from './AuthScreen.styled';

type Props = NavigationData<'Authorization'>;

const AuthScreen: React.FC<Props> = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const token: string = useSelector((state: RootState) => state.auth.token);
  const requestedUsername: string = useSelector(
    (state: RootState) => state.auth.username
  );
  const requestStatus: LoginRequestStatus = useSelector(
    (state: RootState) => state.auth.requestStatus
  );

  const dispatch = useDispatch();

  return (
    <StyledView>
      <StyledText success={token}>
        {'State: '}
        {requestStatus === LoginRequestStatus.UNAUTHENTICATED &&
          'unauthenticated'}
        {requestStatus === LoginRequestStatus.LOADING && '...'}
        {requestStatus === LoginRequestStatus.SUCCESS && 'SUCCESS!'}
        {requestStatus === LoginRequestStatus.FAILURE && 'FAILURE!'}
      </StyledText>
      <StyledText>Username: {requestedUsername || '?'}</StyledText>
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
          disabled={!!token}
          onPress={() => {
            dispatch(login(username, password));
          }}
        />
        <Button
          testID="logout-button"
          title="Logout"
          disabled={!token}
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

export const AuthScreenNavOptions: StackNavigationOptions = {};

export default AuthScreen;
