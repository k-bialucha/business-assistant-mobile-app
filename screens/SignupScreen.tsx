import React, { useState } from 'react';

import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import TextField from '../components/form/TextField';
import { NavigationData } from '../navigation/AuthNavigator';
import { signup } from '../redux/auth/actions';
import Colors from '../theme/Colors';

import { StyledContainer, StyledWideContainer } from './SignupScreen.styled';

type Props = NavigationData<'Signup'>;

const SignupScreen: React.FC<Props> = () => {
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useDispatch();

  return (
    <StyledContainer>
      <StyledWideContainer>
        <TextField value={email} placeholder="E-mail" onChangeText={setEmail} />
        <TextField
          value={phone}
          placeholder="Phone (Optional)"
          onChangeText={setPhone}
        />
        <TextField
          value={password}
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          title="Sign Up"
          buttonStyle={{ backgroundColor: '#ffffff', marginTop: 15 }}
          titleStyle={{ color: Colors.gray }}
          onPress={() => {
            dispatch(signup(email, password, phone));
          }}
        />
      </StyledWideContainer>
    </StyledContainer>
  );
};

export default SignupScreen;
