import React from 'react';
import { Platform } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Colors from '~/theme/Colors';

import CostsNavigator from './CostsNavigator';
import DashboardNavigator from './DashboardNavigator';
import SalesNavigator from './SalesNavigator';
import SettingsNavigator from './SettingsNavigator';

export type ParamList = {
  Dashboard: undefined;
  Sales: undefined;
  Costs: undefined;
  Settings: undefined;
};

const AppTabNavigator = createBottomTabNavigator<ParamList>();

const AppNavigator: React.FC<{}> = () => {
  return (
    <AppTabNavigator.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Dashboard: Platform.OS === 'android' ? 'md-stats' : 'ios-stats',
            Sales:
              Platform.OS === 'android' ? 'md-trending-up' : 'ios-trending-up',
            Costs:
              Platform.OS === 'android'
                ? 'md-trending-down'
                : 'ios-trending-down',
            Settings:
              Platform.OS === 'android' ? 'md-settings' : 'ios-settings',
          };

          return (
            <Ionicons name={icons[route.name]} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: Colors.navyBlue,
        inactiveTintColor: Colors.silver,
      }}
    >
      <AppTabNavigator.Screen name="Sales" component={SalesNavigator} />
      <AppTabNavigator.Screen name="Dashboard" component={DashboardNavigator} />
      <AppTabNavigator.Screen name="Costs" component={CostsNavigator} />
      <AppTabNavigator.Screen name="Settings" component={SettingsNavigator} />
    </AppTabNavigator.Navigator>
  );
};

export default AppNavigator;

// export types so that nested components
// can get navigation data
export type AppNavigatorNavigationProp<
  RouteName extends keyof ParamList
> = StackNavigationProp<ParamList, RouteName>;

export type NavigationData<RouteName extends keyof ParamList> = {
  navigation: AppNavigatorNavigationProp<RouteName>;
  route: RouteProp<ParamList, RouteName>;
};
