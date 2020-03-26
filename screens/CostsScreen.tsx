import React from 'react';
import { Platform, Text, View } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';

const CostsScreen = () => {
  return (
    <View>
      <Text>Costs</Text>
    </View>
  );
};

export const CostsScreenNavOptions = navData => {
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

export default CostsScreen;
