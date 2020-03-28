import React from 'react';
import { Text, View } from 'react-native';

import { NavigationData } from '../navigation/AppNavigator/SettingsNavigator';

type Props = NavigationData<'Settings'>;

const SettingsScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export default SettingsScreen;
