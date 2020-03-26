import React from 'react';

import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import DashboardScreen from '../../screens/DashboardScreen';

import { ParamList } from '.';
import defaultScreenOptions from './defaultScreenOptions';

const DashboardStackNavigator = createStackNavigator<ParamList>();

type ScreenNavigationProp = StackNavigationProp<ParamList, 'Dashboard'>;
type ScreenRouteProp = RouteProp<ParamList, 'Dashboard'>;

type DashboardNavigationProps = React.FC<{
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}>;

const DashboardNavigator: DashboardNavigationProps = () => {
  return (
    <DashboardStackNavigator.Navigator screenOptions={defaultScreenOptions}>
      <DashboardStackNavigator.Screen
        name="Dashboard"
        component={DashboardScreen}
      />
    </DashboardStackNavigator.Navigator>
  );
};

export default DashboardNavigator;
