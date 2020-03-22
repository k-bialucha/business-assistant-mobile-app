import React from 'react';
import { Text, View } from 'react-native';

import { StackNavigationOptions } from '@react-navigation/stack';

import { ScreenProps } from '../navigation/AuthNavigator';

type Props = ScreenProps<'Authorization'>;

const AuthScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>Authorization</Text>
    </View>
  );
};

export const AuthScreenNavOptions: StackNavigationOptions = {};

export default AuthScreen;
