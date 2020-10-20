import React from 'react';
import { Text, View } from 'react-native';

import { NavigationData } from '~/navigation/AppNavigator/SalesNavigator';

type Props = NavigationData<'SalesEntry'>;

const SalesEntryScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>Sales Entry</Text>
    </View>
  );
};

export default SalesEntryScreen;
