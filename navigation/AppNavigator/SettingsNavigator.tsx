import React from 'react';

import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import AuthScreen from '../../screens/AuthScreen';

import defaultScreenOptions from './defaultScreenOptions';
import {
  AppNavigatorNavigationProp,
  NavigationData as AppNavigatorNavigationData,
} from './index';

type ParamList = {
  Settings: undefined;
};

const SettingsStackNavigator = createStackNavigator<ParamList>();

type Props = AppNavigatorNavigationData<'Settings'>;

const SettingsNavigator: React.FC<Props> = () => {
  return (
    <SettingsStackNavigator.Navigator screenOptions={defaultScreenOptions}>
      <SettingsStackNavigator.Screen name="Settings" component={AuthScreen} />
    </SettingsStackNavigator.Navigator>
  );
};

export default SettingsNavigator;

// combine navigation prop for nested navigators
// (AppNavigator data + this StackNavigator data)
export type NavigationPropCombined<
  RouteName extends keyof ParamList
> = CompositeNavigationProp<
  AppNavigatorNavigationProp<'Settings'>,
  StackNavigationProp<ParamList, RouteName>
>;

// export type so screens can get typing
export type NavigationData<RouteName extends keyof ParamList> = {
  navigation: NavigationPropCombined<RouteName>;
  route: RouteProp<ParamList, RouteName>;
};
