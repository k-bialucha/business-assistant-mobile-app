import React from 'react';
import { Button, TouchableWithoutFeedback, View } from 'react-native';

import { StackNavigationOptions } from '@react-navigation/stack';

import { NavigationData } from '../navigation/AuthNavigator';
import Colors from '../theme/Colors';

import {
  StyledButtonsContainer,
  StyledContainer,
  StyledLarge,
  StyledLink,
  StyledLoginTextContainer,
  StyledText,
  StyledWideContainer,
} from './AuthScreen.styled';

type Props = NavigationData<'Authorization'>;

const AuthScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <StyledContainer>
      <View>
        <StyledLarge>Make your business easier.</StyledLarge>
      </View>
      <StyledButtonsContainer>
        <StyledWideContainer>
          <Button
            title="Create an account"
            color={Colors.gray}
            onPress={() => navigation.navigate('Signup')}
          />
        </StyledWideContainer>
        <StyledText>OR</StyledText>
        <StyledWideContainer>
          <Button
            title="Continue with Facebook"
            onPress={() => alert('navigate to fb login')}
          />
        </StyledWideContainer>
        <StyledWideContainer>
          <Button
            title="Continue with Google"
            onPress={() => alert('navigate to google login')}
          />
        </StyledWideContainer>
      </StyledButtonsContainer>
      <StyledLoginTextContainer>
        <StyledText>
          Already have an account?{' '}
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Login')}
          >
            <StyledLink>Log in</StyledLink>
          </TouchableWithoutFeedback>
        </StyledText>
      </StyledLoginTextContainer>
    </StyledContainer>
  );
};

export const AuthScreenNavOptions: StackNavigationOptions = {};

export default AuthScreen;
