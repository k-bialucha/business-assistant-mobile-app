import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen from '../screens/AuthScreen';

const StackNavigator = createStackNavigator();

const AuthNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="Authorization" component={AuthScreen} />
    </StackNavigator.Navigator>
  );
};

export default AuthNavigator;
