import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '.';
import defaultScreenOptions from './defaultScreenOptions';

import CostsScreen, { CostsScreenNavOptions } from '../../screens/CostsScreen';
import CostsEntryScreen from '../../screens/CostsEntryScreen';

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
