import React from 'react';

import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import AuthScreen from '../screens/AuthScreen';

export type RootStackParamList = {
  Authorization: undefined;
};

const StackNavigator = createStackNavigator<RootStackParamList>();

export type ScreenProps<RouteName extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, RouteName>;
  route: RouteProp<RootStackParamList, RouteName>;
};

const AuthNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="Authorization" component={AuthScreen} />
    </StackNavigator.Navigator>
  );
};

export default AuthNavigator;
