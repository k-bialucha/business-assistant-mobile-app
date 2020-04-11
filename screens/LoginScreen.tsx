import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

import { StackNavigationOptions } from '@react-navigation/stack';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
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
} from './LoginScreen.styled';

type Props = NavigationData<'Authorization'>;

const LoginScreen: React.FC<Props> = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const token: string = useSelector((state: RootState) => state.auth.token);
  const requestedUsername: string = useSelector(
    (state: RootState) => state.auth.username
  );
  const requestStatus: LoginRequestStatus = useSelector(
    (state: RootState) => state.auth.requestStatus
  );

  const isAuthenticated: boolean = !!token;

  const dispatch = useDispatch();

  return (
    <StyledView>
      <StyledText testID="status-message" success={isAuthenticated}>
        {'State: '}
        {requestStatus === LoginRequestStatus.UNAUTHENTICATED &&
          'unauthenticated'}
        {requestStatus === LoginRequestStatus.LOADING && '...'}
        {requestStatus === LoginRequestStatus.SUCCESS && 'SUCCESS!'}
        {requestStatus === LoginRequestStatus.FAILURE && 'FAILURE!'}
      </StyledText>
      {isAuthenticated && (
        <StyledText>Username: {requestedUsername || '?'}</StyledText>
      )}
      {!isAuthenticated && (
        <>
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
        </>
      )}
      <StyledButtonsContainer>
        {isAuthenticated ? (
          <Button
            testID="logout-button"
            title="Logout"
            disabled={!isAuthenticated}
            onPress={() => {
              setUsername('');
              setPassword('');
              dispatch(logout());
            }}
          />
        ) : (
          <Button
            testID="login-button"
            title="Login"
            disabled={isAuthenticated}
            onPress={() => {
              dispatch(login(username, password));
            }}
          />
        )}
      </StyledButtonsContainer>
    </StyledView>
  );
};

export const LoginScreenNavOptions: StackNavigationOptions = {};

export default LoginScreen;
