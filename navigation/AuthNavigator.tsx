import React from 'react';

import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import SignupScreen from '../screens/SignupScreen';
import Colors from '../theme/Colors';

export type ParamList = {
  Authorization: undefined;
  Login: undefined;
  Signup: undefined;
  ResetPassword: { email: string };
};

const defaultAuthScreenNavOptions = {
  headerStyle: {
    backgroundColor: Colors.navyBlue,
    borderBottomColor: 'rgba(255,255,255, 0.7)',
    borderBottomWidth: 2,
  },
  headerTintColor: '#ffffff',
};

const StackNavigator = createStackNavigator<ParamList>();

const AuthNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="Authorization"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <StackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={defaultAuthScreenNavOptions}
      />
      <StackNavigator.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{
          ...defaultAuthScreenNavOptions,
          title: 'Reset Password',
        }}
      />
      <StackNavigator.Screen
        name="Signup"
        component={SignupScreen}
        options={defaultAuthScreenNavOptions}
      />
    </StackNavigator.Navigator>
  );
};

export default AuthNavigator;

// export type so screens can get typing
export type NavigationData<RouteName extends keyof ParamList> = {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
};
