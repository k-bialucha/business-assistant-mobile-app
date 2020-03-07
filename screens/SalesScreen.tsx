import React from 'react';
import { View, Text, Platform } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const SalesScreen = () => {
  return (
    <View>
      <Text>Sales</Text>
    </View>
  );
};

export const SalesScreenNavOptions = navData => {
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

export default SalesScreen;
