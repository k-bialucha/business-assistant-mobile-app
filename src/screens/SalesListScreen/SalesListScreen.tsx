import React from 'react';
import { Platform, Text, View } from 'react-native';

import { StackNavigationOptions } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '~/components/HeaderButton';
import { NavigationData } from '~/navigation/AppNavigator/SalesNavigator';

type Props = NavigationData<'SalesList'>;

const SalesListScreen: React.FC<Props> = () => {
  return (
    <View>
      <Text>Sales</Text>
    </View>
  );
};

export const SalesListScreenNavOptions = (
  navData: NavigationData<'SalesList'>
): StackNavigationOptions => {
  return {
    headerTitle: 'Revenues',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add revenue"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => navData.navigation.navigate('SalesEntry')}
        />
      </HeaderButtons>
    ),
  };
};

export default SalesListScreen;
