import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import Colors from '../theme/Colors';

import DashboardScreen from '../screens/DashboardScreen';
import SalesScreen, { SalesScreenNavOptions } from '../screens/SalesScreen';
import SalesEntryScreen from '../screens/SalesEntryScreen';
import CostsScreen, { CostsScreenNavOptions } from '../screens/CostsScreen';
import CostsEntryScreen from '../screens/CostsEntryScreen';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.navyBlue : 'white',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.navyBlue,
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

const AppTabNavigator = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <AppTabNavigator.Navigator>
      <AppTabNavigator.Screen name="Dashboard" component={DashboardNavigator} />
      <AppTabNavigator.Screen name="Sales" component={SalesNavigator} />
      <AppTabNavigator.Screen name="Costs" component={CostsNavigator} />
    </AppTabNavigator.Navigator>
  );
};

export default AppNavigator;
