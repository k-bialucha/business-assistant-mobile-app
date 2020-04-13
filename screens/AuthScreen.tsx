import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { StackNavigationOptions } from '@react-navigation/stack';
import { Button } from 'react-native-elements';

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
            onPress={() => alert('navigate to fb login')}
          />
        </StyledWideContainer>
        <StyledWideContainer>
          <Button
            title="Continue with Google"
            type="outline"
            buttonStyle={{ borderColor: Colors.silver }}
            titleStyle={{ color: Colors.silver, marginLeft: 10 }}
            icon={<FontAwesome name="google" size={18} color="white" />}
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
