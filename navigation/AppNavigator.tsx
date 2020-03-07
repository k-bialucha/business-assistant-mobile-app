import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from '../screens/DashboardScreen';
import SalesScreen from '../screens/SalesScreen';
import CostsScreen from '../screens/CostsScreen';
import CostsEntryScreen from '../screens/CostsEntryScreen';
import SalesEntryScreen from '../screens/SalesEntryScreen';

const DashboardStackNavigator = createStackNavigator();

const DashboardNavigator = () => {
  return (
    <DashboardStackNavigator.Navigator>
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
    <SalesStackNavigator.Navigator>
      <SalesStackNavigator.Screen name="SalesList" component={SalesScreen} />
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
    <CostsStackNavigator.Navigator>
      <CostsStackNavigator.Screen name="CostsList" component={CostsScreen} />
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
