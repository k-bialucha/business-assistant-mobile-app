import React from 'react';

import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import SettingsScreen from '../../screens/SettingsScreen';

import { RootStackParamList } from '.';
import defaultScreenOptions from './defaultScreenOptions';

const SettingsStackNavigator = createStackNavigator<RootStackParamList>();

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Settings'>;

type SettingsNavigationProps = React.FC<{
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}>;

const SettingsNavigator: SettingsNavigationProps = () => {
  return (
    <SettingsStackNavigator.Navigator screenOptions={defaultScreenOptions}>
      <SettingsStackNavigator.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </SettingsStackNavigator.Navigator>
  );
};

export default SettingsNavigator;
