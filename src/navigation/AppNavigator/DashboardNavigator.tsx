import React from 'react';

import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import DashboardScreen from '~/screens/DashboardScreen';

import defaultScreenOptions from './defaultScreenOptions';
import {
  AppNavigatorNavigationProp,
  NavigationData as AppNavigatorNavigationData,
} from './index';

type ParamList = {
  Dashboard: undefined;
};

const DashboardStackNavigator = createStackNavigator<ParamList>();

type Props = AppNavigatorNavigationData<'Dashboard'>;

const DashboardNavigator: React.FC<Props> = () => {
  return (
    <DashboardStackNavigator.Navigator screenOptions={defaultScreenOptions}>
      <DashboardStackNavigator.Screen
        name="Dashboard"
        component={DashboardScreen}
      />
    </DashboardStackNavigator.Navigator>
  );
};

export default DashboardNavigator;

// combine navigation prop for nested navigators
// (AppNavigator data + this StackNavigator data)
export type NavigationPropCombined<
  RouteName extends keyof ParamList
> = CompositeNavigationProp<
  AppNavigatorNavigationProp<'Dashboard'>,
  StackNavigationProp<ParamList, RouteName>
>;

// export type so screens can get typing
export type NavigationData<RouteName extends keyof ParamList> = {
  navigation: NavigationPropCombined<RouteName>;
  route: RouteProp<ParamList, RouteName>;
};
