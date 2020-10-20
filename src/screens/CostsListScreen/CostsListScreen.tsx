import React from 'react';
import { Platform, Text, View } from 'react-native';

import { StackNavigationOptions } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '~/components/HeaderButton';
import { NavigationData } from '~/navigation/AppNavigator/CostsNavigator';

type Props = NavigationData<'CostsList'>;

const CostsListScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>Costs</Text>
    </View>
  );
};

export const CostsListScreenNavOptions = (
  navData: NavigationData<'CostsList'>
): StackNavigationOptions => {
  return {
    headerTitle: 'Costs',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add cost"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => navData.navigation.navigate('CostsEntry')}
        />
      </HeaderButtons>
    ),
  };
};

export default CostsListScreen;
