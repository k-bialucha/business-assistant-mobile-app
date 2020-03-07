import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../theme/Colors';

import DashboardScreen from '../screens/DashboardScreen';
import SalesScreen, { SalesScreenNavOptions } from '../screens/SalesScreen';
import SalesEntryScreen from '../screens/SalesEntryScreen';
import CostsScreen, { CostsScreenNavOptions } from '../screens/CostsScreen';
import CostsEntryScreen from '../screens/CostsEntryScreen';
import SettingsScreen from '../screens/SettingsScreen';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.gray : 'white',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.gray,
};

const DashboardStackNavigator = createStackNavigator();

const DashboardNavigator = () => {
  return (
    <DashboardStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <DashboardStackNavigator.Screen
        name="Dashboard"
        component={DashboardScreen}
      />
    </DashboardStackNavigator.Navigator>
  );
};

const SalesStackNavigator = createStackNavigator();

const SalesNavigator = () => {
  return (
    <SalesStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <SalesStackNavigator.Screen
        name="SalesList"
        component={SalesScreen}
        options={SalesScreenNavOptions}
      />
      <SalesStackNavigator.Screen
        name="SalesEntry"
        component={SalesEntryScreen}
      />
    </SalesStackNavigator.Navigator>
  );
};

const CostsStackNavigator = createStackNavigator();

const CostsNavigator = () => {
  return (
    <CostsStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <CostsStackNavigator.Screen
        name="CostsList"
        component={CostsScreen}
        options={CostsScreenNavOptions}
      />
      <CostsStackNavigator.Screen
        name="CostsEntry"
        component={CostsEntryScreen}
      />
    </CostsStackNavigator.Navigator>
  );
};

const SettingsStackNavigator = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <SettingsStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <SettingsStackNavigator.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </SettingsStackNavigator.Navigator>
  );
};

const AppTabNavigator = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <AppTabNavigator.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Dashboard':
              iconName = Platform.OS === 'android' ? 'md-stats' : 'ios-stats';
              break;
            case 'Sales':
              iconName =
                Platform.OS === 'android'
                  ? 'md-trending-up'
                  : 'ios-trending-up';
              break;
            case 'Costs':
              iconName =
                Platform.OS === 'android'
                  ? 'md-trending-down'
                  : 'ios-trending-down';
              break;
            case 'Settings':
              iconName =
                Platform.OS === 'android' ? 'md-settings' : 'ios-settings';
              break;
            default:
          }

          return <Ionicons name={iconName} size={size} color={color} />;
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
