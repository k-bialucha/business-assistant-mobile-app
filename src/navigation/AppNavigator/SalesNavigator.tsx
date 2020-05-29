import React from 'react';

import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import SalesEntryScreen from '~/screens/SalesEntryScreen';
import SalesScreen, { SalesScreenNavOptions } from '~/screens/SalesScreen';

import defaultScreenOptions from './defaultScreenOptions';
import {
  AppNavigatorNavigationProp,
  NavigationData as AppNavigatorNavigationData,
} from './index';

type ParamList = {
  SalesList: undefined;
  SalesEntry: undefined;
};

const SalesStackNavigator = createStackNavigator<ParamList>();

type Props = AppNavigatorNavigationData<'Sales'>;

const SalesNavigator: React.FC<Props> = () => {
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

// combine navigation prop for nested navigators
// (AppNavigator data + this StackNavigator data)
export type NavigationPropCombined<
  RouteName extends keyof ParamList
> = CompositeNavigationProp<
  AppNavigatorNavigationProp<'Sales'>,
  StackNavigationProp<ParamList, RouteName>
>;

// export type so screens can get typing
export type NavigationData<RouteName extends keyof ParamList> = {
  navigation: NavigationPropCombined<RouteName>;
  route: RouteProp<ParamList, RouteName>;
};
