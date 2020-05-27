import React from 'react';
import { Text, View } from 'react-native';

import { NavigationData } from '../../navigation/AppNavigator/DashboardNavigator';

type Props = NavigationData<'Dashboard'>;

const DashboardScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
};

export default DashboardScreen;
