import React from 'react';
import { Text, View } from 'react-native';

import { NavigationData } from '../navigation/AppNavigator/CostsNavigator';

type Props = NavigationData<'CostsEntry'>;

const CostsEntryScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>Costs Entry</Text>
    </View>
  );
};

export default CostsEntryScreen;
