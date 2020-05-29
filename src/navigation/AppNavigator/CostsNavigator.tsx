import React from 'react';

import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import CostsEntryScreen from '~/screens/CostsEntryScreen';
import CostsListScreen, {
  CostsListScreenNavOptions,
} from '~/screens/CostsListScreen';

import defaultScreenOptions from './defaultScreenOptions';
import {
  AppNavigatorNavigationProp,
  NavigationData as AppNavigatorNavigationData,
} from './index';

type ParamList = {
  CostsList: undefined;
  CostsEntry: undefined;
};

const CostsStackNavigator = createStackNavigator<ParamList>();

type Props = AppNavigatorNavigationData<'Costs'>;

const CostsNavigator: React.FC<Props> = () => {
  return (
    <CostsStackNavigator.Navigator screenOptions={defaultScreenOptions}>
      <CostsStackNavigator.Screen
        name="CostsList"
        component={CostsListScreen}
        options={CostsListScreenNavOptions}
      />
      <CostsStackNavigator.Screen
        name="CostsEntry"
        component={CostsEntryScreen}
      />
    </CostsStackNavigator.Navigator>
  );
};

export default CostsNavigator;

// combine navigation prop for nested navigators
// (AppNavigator data + this StackNavigator data)
export type NavigationPropCombined<
  RouteName extends keyof ParamList
> = CompositeNavigationProp<
  AppNavigatorNavigationProp<'Costs'>,
  StackNavigationProp<ParamList, RouteName>
>;

// export type so screens can get typing
export type NavigationData<RouteName extends keyof ParamList> = {
  navigation: NavigationPropCombined<RouteName>;
  route: RouteProp<ParamList, RouteName>;
};
