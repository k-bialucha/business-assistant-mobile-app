import React, { useState } from 'react';
import { Button } from 'react-native';

import { StackNavigationOptions } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

import TextField from '../components/form/TextField';
import { NavigationData } from '../navigation/AuthNavigator';
import { login } from '../redux/auth';

import {
  StyledButtonsContainer,
  StyledText,
  StyledView,
  StyledWideContainer,
} from './LoginScreen.styled';

type Props = NavigationData<'Login'>;

const LoginScreen: React.FC<Props> = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();

  return (
    <StyledView>
      <StyledWideContainer>
        <TextField
          testID="username-input"
          value={username}
          placeholder="E-mail"
          onChangeText={setUsername}
        />
        <TextField
          testID="password-input"
          value={password}
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry
        />
      </StyledWideContainer>
      <StyledButtonsContainer>
        <Button
          testID="login-button"
          title="Login"
          onPress={() => {
            dispatch(login(username, password));
          }}
        />
      </StyledButtonsContainer>
    </StyledView>
  );
};

export const LoginScreenNavOptions: StackNavigationOptions = {};

export default LoginScreen;
