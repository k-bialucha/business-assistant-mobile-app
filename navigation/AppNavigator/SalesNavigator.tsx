import React from 'react';

import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import SalesEntryScreen from '../../screens/SalesEntryScreen';
import SalesScreen, { SalesScreenNavOptions } from '../../screens/SalesScreen';

import { ParamList } from '.';
import defaultScreenOptions from './defaultScreenOptions';

const SalesStackNavigator = createStackNavigator();

type ScreenNavigationProp = StackNavigationProp<ParamList, 'Sales'>;

type ScreenRouteProp = RouteProp<ParamList, 'Sales'>;

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
