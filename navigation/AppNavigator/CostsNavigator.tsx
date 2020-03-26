import React from 'react';

import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import CostsEntryScreen from '../../screens/CostsEntryScreen';
import CostsScreen, { CostsScreenNavOptions } from '../../screens/CostsScreen';

import { RootStackParamList } from '.';
import defaultScreenOptions from './defaultScreenOptions';

const CostsStackNavigator = createStackNavigator();

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Costs'>;

type ScreenRouteProp = RouteProp<RootStackParamList, 'Costs'>;

type CostsNavigationProps = React.FC<{
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}>;

const CostsNavigator: CostsNavigationProps = () => {
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
