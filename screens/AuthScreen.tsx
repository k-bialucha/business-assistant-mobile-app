import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { StackNavigationOptions } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import PlainText from '../components/UI/PlainText';
import { NavigationData } from '../navigation/AuthNavigator';
import { loginWithFacebook, loginWithGoogle } from '../redux/auth/actions';
import Colors from '../theme/Colors';

import {
  StyledButtonsContainer,
  StyledContainer,
  StyledLargeText,
  StyledLoginTextContainer,
  StyledWideContainer,
} from './AuthScreen.styled';

type Props = NavigationData<'Authorization'>;

const AuthScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <StyledContainer>
      <View>
        <StyledLargeText>Make your business easier.</StyledLargeText>
      </View>
      <StyledButtonsContainer>
        <StyledWideContainer>
          <Button
            title="Create an account"
            buttonStyle={{ backgroundColor: Colors.gray }}
            onPress={() => navigation.navigate('Signup')}
          />
        </StyledWideContainer>
        <View
          style={{
            marginVertical: 15,
            backgroundColor: '#ffffff',
            height: 1,
            width: 50,
          }}
        />
        <StyledWideContainer>
          <Button
            title="Continue with Facebook"
            type="outline"
            buttonStyle={{ borderColor: Colors.silver }}
            titleStyle={{ color: Colors.silver, marginLeft: 10 }}
            icon={<FontAwesome name="facebook-f" size={18} color="white" />}
            onPress={() => {
              dispatch(loginWithFacebook());
            }}
          />
        </StyledWideContainer>
        <StyledWideContainer>
          <Button
            title="Continue with Google"
            type="outline"
            buttonStyle={{ borderColor: Colors.silver }}
            titleStyle={{ color: Colors.silver, marginLeft: 10 }}
            icon={<FontAwesome name="google" size={18} color="white" />}
            onPress={() => {
              dispatch(loginWithGoogle());
            }}
          />
        </StyledWideContainer>
      </StyledButtonsContainer>
      <StyledLoginTextContainer>
        <PlainText color="#ffffff">
          Already have an account?{' '}
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Login')}
          >
            <PlainText theme="light" bold>
              Log in
            </PlainText>
          </TouchableWithoutFeedback>
        </PlainText>
      </StyledLoginTextContainer>
    </StyledContainer>
  );
};

export const AuthScreenNavOptions: StackNavigationOptions = {};

export default AuthScreen;
