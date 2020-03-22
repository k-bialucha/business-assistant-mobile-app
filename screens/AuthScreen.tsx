import React from 'react';
import { Text, View } from 'react-native';

import { StackNavigationOptions } from '@react-navigation/stack';

import { NavigationData } from '../navigation/AuthNavigator';

type Props = NavigationData<'Authorization'>;

const AuthScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>Authorization</Text>
    </View>
  );
};

export const AuthScreenNavOptions: StackNavigationOptions = {};

export default AuthScreen;
