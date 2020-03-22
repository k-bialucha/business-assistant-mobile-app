import React from 'react';
import { Text, View } from 'react-native';

import { ScreenProps } from '../navigation/AuthNavigator';

type Props = ScreenProps<'Authorization'>;

const AuthScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>Authorization</Text>
    </View>
  );
};

export const AuthScreenNavOptions = {};

export default AuthScreen;
