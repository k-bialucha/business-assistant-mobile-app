import React, { useState } from 'react';

import { StackNavigationOptions } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import TextField from '../components/form/TextField';
import { NavigationData } from '../navigation/AuthNavigator';
import { login } from '../redux/auth';
import Colors from '../theme/Colors';

import { StyledView, StyledWideContainer } from './LoginScreen.styled';

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
        <Button
          testID="login-button"
          title="Login"
          buttonStyle={{ backgroundColor: '#ffffff', marginTop: 15 }}
          titleStyle={{ color: Colors.gray }}
          onPress={() => {
            dispatch(login(username, password));
          }}
        />
      </StyledWideContainer>
    </StyledView>
  );
};

export const LoginScreenNavOptions: StackNavigationOptions = {};

export default LoginScreen;