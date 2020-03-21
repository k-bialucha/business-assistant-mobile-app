import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '.';
import defaultScreenOptions from './defaultScreenOptions';

import SalesScreen, { SalesScreenNavOptions } from '../../screens/SalesScreen';
import SalesEntryScreen from '../../screens/SalesEntryScreen';

const SalesStackNavigator = createStackNavigator();

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Sales'>;

type ScreenRouteProp = RouteProp<RootStackParamList, 'Sales'>;

type SalesNavigationProps = React.FC<{
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}>;

const SalesNavigator: SalesNavigationProps = () => {
  return (
    <SalesStackNavigator.Navigator screenOptions={defaultScreenOptions}>
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

export default SalesNavigator;
