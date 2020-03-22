import React from 'react';

import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import CostsEntryScreen from '../../screens/CostsEntryScreen';
import CostsScreen, { CostsScreenNavOptions } from '../../screens/CostsScreen';

import defaultScreenOptions from './defaultScreenOptions';
import {
  AppNavigatorNavigationProp,
  NavigationData as AppNavigatorNavigationData,
} from './index';

type RootStackParamList = {
  CostsList: undefined;
  CostsEntry: undefined;
};

const CostsStackNavigator = createStackNavigator<RootStackParamList>();

type Props = AppNavigatorNavigationData<'Costs'>;

const CostsNavigator: React.FC<Props> = () => {
  return (
    <CostsStackNavigator.Navigator screenOptions={defaultScreenOptions}>
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

export default CostsNavigator;

export type NavigationPropCombined<
  RouteName extends keyof RootStackParamList
> = CompositeNavigationProp<
  AppNavigatorNavigationProp<'Costs'>,
  StackNavigationProp<RootStackParamList, RouteName>
>;

export type NavigationData<RouteName extends keyof RootStackParamList> = {
  navigation: NavigationPropCombined<RouteName>;
  route: RouteProp<RootStackParamList, RouteName>;
};
