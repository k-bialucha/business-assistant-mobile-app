import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import CostsEntryScreen from '../../screens/CostsEntryScreen';
import CostsScreen, { CostsScreenNavOptions } from '../../screens/CostsScreen';

import defaultScreenOptions from './defaultScreenOptions';
import { ScreenProps } from './index';

const CostsStackNavigator = createStackNavigator();

type Props = ScreenProps<'Costs'>;

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
