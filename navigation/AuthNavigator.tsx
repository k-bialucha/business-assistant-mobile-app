import React from 'react';

import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';

export type ParamList = {
  Authorization: undefined;
  Login: undefined;
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
      <StackNavigator.Screen name="Login" component={LoginScreen} />
    </StackNavigator.Navigator>
  );
};

export default AuthNavigator;

// export type so screens can get typing
export type NavigationData<RouteName extends keyof ParamList> = {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
};
